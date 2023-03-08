const mongoose = require("mongoose");

const bookUserSchema  = new mongoose.Schema({
    rating: {type: Number, min: 1.0, max: 5.0 ,default:1 },
    status: {
        type: String,
        enum: ["Read", "Reading", " wantToRead","notRead"],
        default: "notRead",
    },
    book: {type: mongoose.Schema.Types.ObjectId, required:true ,ref: 'book'},
    user: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" }
  });
  const bookUserModel = mongoose.model("bookUser", bookUserSchema);
  module.exports = bookUserModel;