const mongoose = require("mongoose");

const reviewSchema  = new mongoose.Schema({
    content: String,
    date: Date,
    book: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
  });

  const reviewModel = mongoose.model("review", reviewSchema);
  module.exports = reviewModel;