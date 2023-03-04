const mongoose = require('mongoose');
const counterModel = require('../counter/count')
const bookModel = require('../books/book')
const authorSchema = new mongoose.Schema({
    ID:{type:Number,unique:true,require:true},
    photo:{type:String },
          // match:/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{5})$/ },//match [(code area)(xxx-xxxxx)
    firstName:{type:String,require:true,maxLength:10,minLength:3},
    lastName:{type:String,require:true,maxLength:10,minLength:3},
    dateOfBirth:{type:String,require:true,
        match:/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/},//match DD/MM/YYYY
    books:[{type:mongoose.Schema.Types.ObjectId,ref:bookModel}]    
})//schema

// to make ID auto increment should make model counter and befor save data 
// increment counter and assign it to ID 
authorSchema.pre('save', function (next){
     const  doc =this;
    counterModel.findByIdAndUpdate({_id:'authorId'},{$inc:{sequence_value:1}},{new: true, upsert: true})
                .then(function (count){
                    doc.ID = count.sequence_value;
                    next();
                })//then
                .catch(err =>{
                    console.log('counter error-> : ', err);
                    throw err;
                })//catch
})//pre

// to delete all books of author before delete author
// Define pre remove hook to delete all books of an author
authorSchema.pre('remove', async function (next) {
    const author = this;
    try {
      // Delete all books of the author
      await bookModel.deleteMany({ author: author._id });
      next();
    } catch (err) {
      next(err);
    }
  });
const authorModel = mongoose.model('author',authorSchema);

module.exports = authorModel;