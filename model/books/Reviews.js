const mongoose = require("mongoose");

const reviewSchema  = new mongoose.Schema({
    content: String,
    date: Date,
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  });

  const reviewModel = mongoose.model("Review", reviewSchema);
  module.exports = reviewModel;