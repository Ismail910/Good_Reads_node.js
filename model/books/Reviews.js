const mongoose = require("mongoose");

const reviewSchema  = new mongoose.Schema({
    book: {type: mongoose.Schema.Types.String, ref: 'Book'},
    content: String,
    date: Date,
    rating: {type: Number, min: 1.0, max: 5.0}
  });

  const reviewModel = mongoose.model("Review", reviewSchema);
  module.exports = reviewModel;