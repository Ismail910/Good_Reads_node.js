const mongoose = require("mongoose");

const reviewSchema  = new mongoose.Schema({
    comment: String,
    date: {type: Date, default: new Date()},
    book: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "book" },
  });

  const reviewModel = mongoose.model("reviews", reviewSchema);
  module.exports = reviewModel;
 