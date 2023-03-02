const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT | 4000;
const URL = "mongodb://127.0.0.1:27017"
app.use(express.json());


//to connect mongoose

mongoose.connect("mongodb://127.0.0.1:27017/good_reades") 


//to start server
app.listen(PORT,(err)=>{
    if(!err) {
       return  console.log("server runnig",PORT);
    }
    console.log(err);
})//listen
