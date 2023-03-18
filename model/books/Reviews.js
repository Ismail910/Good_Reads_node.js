const mongoose = require("mongoose");

const reviewSchema  = new mongoose.Schema({
    comment: String,
    like: {type:Boolean, default:false},
    date: {type: Date, default: new Date("<YYYY-mm-ddTHH:MM:ss>")},
    book: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "book" },
    user: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" },

  });

  const reviewModel = mongoose.model("reviews", reviewSchema);
  module.exports = reviewModel;
 