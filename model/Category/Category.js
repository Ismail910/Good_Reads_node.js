const mongoose = require("mongoose");
const counterModel = require('../counter/count');
//this schema for structure of my data
const CategorySchema = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    name: {type: String, require: true ,unique:true},
    books: [{ type: mongoose.Schema.Types.ObjectId,ref: "book" }]  
});

CategorySchema.pre('save', function (next){
    const  doc =this;
    
   counterModel.findByIdAndUpdate({_id:'categoryID'},{$inc:{sequence_value:1}},{new: true, upsert: true})
               .then(function (count){
                   doc.id = count.sequence_value;
                   next();
               })
               .catch(err =>{
                   console.log('counter error-> : ', err);
                   throw err;
               })
})//pre
//this model that db see it when it makes quiries
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
