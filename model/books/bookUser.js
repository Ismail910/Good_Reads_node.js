const mongoose = require("mongoose");
const counterModel = require('../counter/count');

const bookUserSchema  = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    rating: {type: Number, min: 1.0, max: 5.0 ,default:1.0},
    status: {
        type: String,
        enum: ["Read", "Reading", "wantToRead","notRead"],
        default: "notRead",
    },
    book: {type: mongoose.Schema.Types.ObjectId, required:true ,ref: 'book'},
    user: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "user" }
  });

  bookUserSchema.pre('save', function (next){
    const  doc =this;
   counterModel.findByIdAndUpdate({_id:'bookUserid'},{$inc:{sequence_value:1}},{new: true, upsert: true})
               .then(function (count){
                   doc.id = count.sequence_value;
                   next();
               })
               .catch(err =>{
                   console.log('counter error-> : ', err);
                   throw err;
               })
})//pre
  const bookUserModel = mongoose.model("bookUser", bookUserSchema);
  module.exports = bookUserModel;