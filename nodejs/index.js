require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5432;
const app = express();

const Cards = require("./models/cards.model");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database....");
  });

const corsOptions = {
  origin: [process.env.CORS_ORIGIN_TEST, process.env.CORS_ORIGIN_PROD],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    data: { message: "API OK" },
  });
});

app.get("/cards", (_, res) => {
  const cards = [];
  Cards.findOne()
    .select("-_id -__v")
    .lean()
    .then((result) => {
      if (!result) {
        cards.push("0", "1", "2");
      } else {
        for (const card of result.cards) {
          cards.push(card);
        }
      }
      res.status(200).send({
        success: true,
        data: { message: "GET OK", cards },
      });
    });
});

app.post("/", (req, res) => {
  if (!("cards" in req.body)) {
    req.body.cards = "[0, 1, 2]";
  }

  const cards = [...JSON.parse(req.body.cards), 0, 1, 2].slice(0, 3);
  console.log(cards);

  Cards.findOne()
    .then((result) => {
      if (!result) {
        new Cards({
          cards,
        }).save();
      } else {
        // const savedDay = ....;
        // const nowDay = ....;
        // const nowTimeGermany = ....;
        console.log(result);
        // if (__ && __) {
        //   result.update.save();
        // }
      }

      res.status(200).send({
        success: true,
        data: { message: "POST OK" },
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        data: `${err}`,
      });
    });
});

let server = app.listen(PORT, () => {
  console.log(`Listening @ ${PORT}`);
});

module.exports = server;
