const mongoose = require('mongoose');
const counterModel = require('../../counter/count');


const userSchema = new mongoose.Schema({
  id:{type:Number,unique:true,require:true},
  first_name: { type: String, required: true },
  last_name: { type: String, required: true},
  email: { type: String, required: true,unique:true,
  }, // match   example mmmmm@gmail.com
  password: { type: String ,required: true,
    match: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/}, // match Minimum eight characters, at least one letter and one number:
  confirmPassword: { type: String, required: true},  // check the same password
  img: { type: String},
  isAdmin: { type: Boolean ,default: false},
  token: { type: String }

});



userSchema.pre('save', function (next){
  const  doc =this;
  
 counterModel.findByIdAndUpdate({_id:'userID'},{$inc:{sequence_value:1}},{new: true, upsert: true})
             .then(function (count){
                 doc.id = count.sequence_value;
                 next();
             })
             .catch(err =>{
                 console.log('counter error-> : ', err);
                 throw err;
             })
})//pre
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;