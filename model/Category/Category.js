const mongoose = require("mongoose");
//this schema for structure of my data
const CategorySchema = new mongoose.Schema({
    name: { type: String, require: true,unique:true },
    books: [{ type: mongoose.Schema.Types.ObjectId,ref: "book" }]  
});
//this model that db see it when it makes quiries
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
