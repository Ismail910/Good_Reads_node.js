const mongoose = require("mongoose");

const bookchema = new mongoose.Schema({
    name: { type: String, require: true },
    img: { type: String, require: true },
    status: {
        type: String,
        required: true,
        enum: ["Read", "Reading", " wantToRead"],
        default: "Maintenance",
    },
    summary: { type: String, required: true },
    reviews: [{ "type": Schema.Types.ObjectId, "ref": "Review" }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    auther: { type: mongoose.Schema.Types.ObjectId, ref: "Auther" },
});

const bookModel = mongoose.model("Book", bookchema);

module.exports = bookModel;
