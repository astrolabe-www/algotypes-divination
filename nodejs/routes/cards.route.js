const { Router } = require("express");
const { DateTime } = require("luxon");

const Cards = require("../models/cards.model");

const TIMEZONE_IANA = "Europe/Berlin";
const UPDATE_HOUR = 8;

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

module.exports = (app) => {
  const router = Router();
  app.use("/cards", router);

  router.get("/", (_, res) => {
    const respose = {
      type: "",
      timestamp: "",
      cards: [],
    };

    Cards.findOne()
      .sort({ updatedAt: -1 })
      .select("-_id -__v")
      .lean()
      .then((result) => {
        if (!result) {
          respose.type = "MADE UP DATA";
          respose.cards.push("0", "1", "2");
          respose.timestamp = new Date().toISOString();
        } else {
          respose.type = "REAL DATA";
          respose.cards.push(...result.cards);
          respose.timestamp = result.updatedAt.toISOString();
        }

        res.status(200).send({
          success: true,
          data: respose,
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
        };

        if (!result) {
          response.out.type = "CREATE CARDS";
          new Cards({ cards }).save();
        } else {
          const now = DateTime.now()
            .setZone(TIMEZONE_IANA)
            .plus({ minutes: 15 });
          const update = DateTime.fromJSDate(result.updatedAt).setZone(
            TIMEZONE_IANA
          );

          const sameDay = update.hasSame(now, "day");
          const pastUpdateTime = now.hour >= UPDATE_HOUR;

          if (!sameDay && pastUpdateTime) {
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
