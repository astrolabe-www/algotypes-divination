const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
  cards: {
    type: [Number],
    required: true
  }
}, { timestamps: true });

const Cards = mongoose.model('Cards', CardsSchema);

module.exports = Cards;
