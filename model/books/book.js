const mongoose = require("mongoose");

const bookchema = new mongoose.Schema({
    name: { type: String, require: true },
    img: { type: String, require: true },
    summary: { type: String, required: true },

    //////////////ref
    reviews: [{ "type": mongoose.Schema.Types.ObjectId, ref: "review" }],
    rating: { "type": mongoose.Schema.Types.ObjectId, ref : "rating" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    author:  {type: mongoose.Schema.Types.ObjectId, ref: "author" },

});

const bookModel = mongoose.model("book", bookchema);

module.exports = bookModel;
