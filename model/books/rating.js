const mongoose = require("mongoose");

const ratingSchema  = new mongoose.Schema({
    rating: {type: Number, min: 1.0, max: 5.0},
    status: {
        type: String,
        required: true,
        enum: ["Read", "Reading", " wantToRead"],
        default: "Maintenance",
    },
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},

  });
  const ratingModel = mongoose.model("Rating", ratingSchema);
  module.exports = ratingModel;