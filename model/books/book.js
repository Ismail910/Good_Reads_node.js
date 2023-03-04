const mongoose = require("mongoose");

const bookchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: { type: String, required: true },


    //////////////ref
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    bookUser: { type: mongoose.Schema.Types.ObjectId,  ref : "bookUser" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    author:  {type: mongoose.Schema.Types.ObjectId,required:true, ref: "author" },
});

const bookModel = mongoose.model("book", bookchema);

module.exports = bookModel;