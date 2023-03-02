const express=require('express');
 const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const PORT=3000;


mongoose.connect('mongodb://localhost/my_database').then(()=>{}).catch(()=>{})



app.listen(PORT,(err)=>{
    if(!err) return console.log(`server start at port ${PORT}`);
    console.log(err);
})