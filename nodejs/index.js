const env = require("dotenv");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const routeCards = require("./routes/cards.route");

env.config();

const PORT = process.env.PORT || 5432;
const app = express();

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

routeCards(app);

let server = app.listen(PORT, () => {
  console.log(`Listening @ ${PORT}`);
});

module.exports = server;
