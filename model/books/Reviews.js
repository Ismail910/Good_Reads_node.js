const mongoose = require("mongoose");
const counterModel = require('../counter/count');

const reviewSchema  = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    comment: String,
    date: {type: Date, default: new Date()},
    changeLike: {
      like:{type:Boolean, default:false},
      userId:{ type: mongoose.Schema.Types.ObjectId, ref: "user" },
      dateLike:{type: Date, default: new Date()}},
    book: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "book" },
    user: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" },

  });


  reviewSchema.pre('save', function (next){
    const  doc =this;
    
   counterModel.findByIdAndUpdate({_id:'reviewid'},{$inc:{sequence_value:1}},{new: true, upsert: true})
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
 