const mongoose = require("mongoose");
//this schema for structure of my data
const CategorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    

});
//this model that db see it when it makes quiries
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
