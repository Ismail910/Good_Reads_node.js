const express=require('express');
 const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const PORT=3000;

// router author
const authorRouter = require("./routes/author");

app.use('/admin/author',authorRouter);



//to connect  our database my_goodreads
mongoose.connect('mongodb://localhost/my_goodreads').then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.error('Error connecting to MongoDB:', err);
})//connect


//to listen server in port
app.listen(PORT,err=>{
    if(!err) return console.log(`server start at port ${PORT}`);
    console.log(err);
})//listen