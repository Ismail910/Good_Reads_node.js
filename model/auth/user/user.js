// const express = require('express');
const mongoose = require('mongoose');
// const app = express();
// const PORT = 3000;
// app.use(express.json());


const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true},
  email: { type: String, required: true,unique:true,
    match:/^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}, // match   example mmmmm@gmail.com
  password: { type: String ,required: true,
    match: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/}, // match Minimum eight characters, at least one letter and one number:
  confirmPassword: { type: String, required: true},  // check the same password
  img: { type: String,default:" "},
  isAdmin: { type: Boolean ,default: false},
  token: { type: String }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;