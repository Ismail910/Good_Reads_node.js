const mongoose = require("mongoose");
const counterModel = require('../counter/count');

const reviewSchema  = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    comment: String,
    like: {type:Boolean, default:false},
    date: {type: Date, default: new Date("<YYYY-mm-ddTHH:MM:ss>")},
    book: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "book" },
    user: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" },

  });


  reviewSchema.pre('save', function (next){
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

  const reviewModel = mongoose.model("reviews", reviewSchema);
  module.exports = reviewModel;
 