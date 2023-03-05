// const express = require('express');
const mongoose = require('mongoose');
// const app = express();
// const PORT = 3000;
// app.use(express.json());


const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String ,required: true},
  img: { type: String,default:" "},
  token: { type: String },
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;