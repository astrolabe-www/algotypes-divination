const { Router } = require("express");
const { DateTime } = require("luxon");

const Cards = require("../models/cards.model");

const TIMEZONE_IANA = "Europe/Berlin";
const UPDATE_HOUR = 8;

module.exports = (app) => {
  const router = Router();
  app.use("/cards", router);

  router.get("/", (_, res) => {
    const resposeData = {
      message: "",
      cards: [],
      updatedAt: "",
    };

    Cards.findOne()
      .sort({ updatedAt: -1 })
      .select("-_id -__v")
      .lean()
      .then((result) => {
        if (!result) {
          resposeData.message = "MADE UP DATA";
          resposeData.cards.push("0", "1", "2");
          resposeData.updatedAt = new Date().toISOString();
        } else {
          resposeData.message = "REAL DATA";
          resposeData.cards.push(...result.cards);
          resposeData.updatedAt = result.updatedAt.toISOString();
        }

        res.status(200).send({
          success: true,
          data: resposeData,
        });
      });
  });

  router.post("/", (req, res) => {
    if (!("cards" in req.body)) {
      req.body.cards = "[0, 1, 2]";
    }

    const cards = [...JSON.parse(req.body.cards), 0, 1, 2].slice(0, 3);

    let message = "";

    Cards.findOne()
      .sort({ updatedAt: -1 })
      .then((result) => {
        if (!result) {
          message = `FIRST CARDS: ${cards}`;
          new Cards({ cards }).save();
        } else {
          message = `DB CARDS: ${result.cards}`;

          const now = DateTime.now().setZone(TIMEZONE_IANA);
          const update = DateTime.fromJSDate(result.updatedAt).setZone(
            TIMEZONE_IANA
          );

          const sameDay = update.hasSame(now, "day");
          const pastUpdateTime = now.hour > UPDATE_HOUR;

          if (!sameDay && pastUpdateTime) {
            message = `NEW CARDS: ${cards}`;
            new Cards({ cards }).save();
          }
        }

        res.status(200).send({
          success: true,
          data: { message },
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
