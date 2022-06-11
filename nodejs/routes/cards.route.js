const { Router } = require("express");
const { DateTime } = require("luxon");

const Cards = require("../models/cards.model");

const TIMEZONE_IANA = "Europe/Berlin";
const UPDATE_HOUR = 8;

const GET_RETRY_DELAY_MILLIS = 2 * 60 * 1000;
const GET_RETRY_LIMIT = 8;

let getRetries = 0;

const logPostResponse = (response) => {
  console.log(`${response.in.timestamp} | type: ${response.out.type}`);
  console.log(
    `${response.in.timestamp} |   in: [ ${response.in.cards} ] @ ${response.in.timestamp}`
  );
  console.log(
    `${response.in.timestamp} |  out: [ ${response.out.cards} ] @ ${response.out.timestamp}`
  );
  console.log(`\n`);
};

const getNextUpdateDelayMillis = () => {
  const now = DateTime.now().setZone(TIMEZONE_IANA);
  const updateDayOffset = now.hour >= UPDATE_HOUR ? 1 : 0;
  const nextUpdate = DateTime.now()
    .setZone(TIMEZONE_IANA)
    .startOf("day")
    .plus({ days: updateDayOffset, hours: UPDATE_HOUR });
  const nextUpdateDelayMillis = nextUpdate.diff(now).milliseconds;
  return nextUpdateDelayMillis;
};

const cardsNeedUpdate = (lastUpdateDateJS) => {
  const now = DateTime.now().setZone(TIMEZONE_IANA);
  const update = DateTime.fromJSDate(lastUpdateDateJS).setZone(TIMEZONE_IANA);

  const sameDay = update.hasSame(now, "day");
  const pastUpdateTime = now.hour >= UPDATE_HOUR;

  return !sameDay && pastUpdateTime;
};

const draw3Cards = () => {
  const RANDOM_CARDS = Array.from({ length: 22 }, (_, i) => i);
  return RANDOM_CARDS.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 3);
};

module.exports = (app) => {
  const router = Router();
  app.use("/cards", router);

  router.get("/", (_, res) => {
    const respose = {
      timestamp: "",
      cards: [],
      nextGetDelayMillis: GET_RETRY_DELAY_MILLIS,
    };

    Cards.findOne()
      .sort({ updatedAt: -1 })
      .select("-_id -__v")
      .lean()
      .then((result) => {
        if (!result || getRetries >= GET_RETRY_LIMIT) {
          const cards = draw3Cards();
          new Cards({ cards }).save();
          respose.cards.push(...cards);
          respose.timestamp = new Date().toISOString();
          respose.nextGetDelayMillis = getNextUpdateDelayMillis();
          getRetries = 0;
        } else {
          respose.cards.push(...result.cards);
          respose.timestamp = result.updatedAt.toISOString();

          const stale = cardsNeedUpdate(result.updatedAt);

          if (stale) {
            respose.nextGetDelayMillis = GET_RETRY_DELAY_MILLIS;
            getRetries++;
          } else {
            respose.nextGetDelayMillis = getNextUpdateDelayMillis();
            getRetries = 0;
          }
        }

        res.status(200).send({
          success: true,
          data: respose,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          data: { error: `${err}` },
        });
      });
  });

  router.post(`/${process.env.POST_TOKEN}`, (req, res) => {
    if (!("cards" in req.body)) {
      req.body.cards = "[0, 1, 2]";
    }

    const cards = [...JSON.parse(req.body.cards), 0, 1, 2].slice(0, 3);

    Cards.findOne()
      .sort({ updatedAt: -1 })
      .then((result) => {
        const nextPostDelayMillis = getNextUpdateDelayMillis();

        const response = {
          in: {
            type: "INPUT",
            timestamp: DateTime.now().toUTC(),
            cards: [...cards],
          },
          out: {
            type: "",
            timestamp: DateTime.now().toUTC(),
            cards: [...cards],
          },
          nextPostDelayMillis,
        };

        if (!result) {
          response.out.type = "CREATE CARDS";
          new Cards({ cards }).save();
        } else {
          const stale = cardsNeedUpdate(result.updatedAt);

          if (stale) {
            response.out.type = "UPDATE CARDS";
            new Cards({ cards }).save();
          } else {
            response.out.type = "READ CARDS";
            response.out.cards = [...result.cards];
            response.out.timestamp = result.updatedAt.toISOString();
          }
        }

        logPostResponse(response);

        res.status(200).send({
          success: true,
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          data: { error: `${err}` },
        });
      });
  });
};
