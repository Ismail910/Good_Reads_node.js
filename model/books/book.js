const mongoose = require("mongoose");

const bookchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: { type: String, required: true },
    avg_rate:{type:Number,default:0},
    //////////////ref
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    bookUser: { type: mongoose.Schema.Types.ObjectId,  ref : "bookUser" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
<<<<<<< HEAD
     author:  {type: mongoose.Schema.Types.ObjectId,required:true, ref: "author" },
    // user:  {type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" },
    authorID: {type:Number,require}
=======
    author:  {type: mongoose.Schema.Types.ObjectId,required:true, ref: "author" },
   // authorID: {type:Number,require}
>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a
});

const bookModel = mongoose.model("book", bookchema);

module.exports = bookModel;
