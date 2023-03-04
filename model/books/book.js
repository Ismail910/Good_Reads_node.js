const mongoose = require("mongoose");

const bookchema = new mongoose.Schema({
    name: { type: String, require: true },
    img: { type: String, require: true },
    summary: { type: String, required: true },

    //////////////ref
    reviews: [{ "type": mongoose.Schema.Types.ObjectId, "ref": "Review" }],
    reviews: { "type": mongoose.Schema.Types.ObjectId, "ref": "Rating" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    author:  {type: mongoose.Schema.Types.ObjectId, ref: "Author" },

});

const bookModel = mongoose.model("Book", bookchema);

module.exports = bookModel;
