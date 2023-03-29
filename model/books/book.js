const mongoose = require("mongoose");
const counterModel = require('../counter/count');
const bookchema = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    name: { type: String, required: true ,index: true},
    img: { type: String, required: true },
    summary: { type: String, required: true },
    avg_rate:{type:Number,default:0},

    //////ref

    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    bookUser: [{type: mongoose.Schema.Types.ObjectId,  ref : "bookUser" }],
    category: {type: mongoose.Schema.Types.ObjectId,required:true, ref: "category" },
    author:  {type: mongoose.Schema.Types.ObjectId,required:true, ref: "author" },

});
bookchema.index({ name: 'text' });

bookchema.pre('save', function (next){
    const  doc =this;
   counterModel.findByIdAndUpdate({_id:'bookid'},{$inc:{sequence_value:1}},{new: true, upsert: true})
               .then(function (count){
                   doc.id = count.sequence_value;
                   next();
               })
               .catch(err =>{
                   console.log('counter error-> : ', err);
                   throw err;
               })
})//pre
const bookModel = mongoose.model("book", bookchema);

module.exports = bookModel;
