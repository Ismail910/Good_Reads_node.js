const express=require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const PORT= process.env.Port || 3000 ;
const URL = process.env.url || "mongodb://localhost" ;

// router author
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const ratingRouter = require("./routes/rating");
const reviewsRouter = require("./routes/reviews");




////////////////Routers
app.use(['/book' , '/books'], bookRouter);
app.use('/admin/author',authorRouter);
app.use('/rating' , ratingRouter);

// <<<<<<< HEAD
// app.use('/admin/author',authorRouter);

// ////////////////Routers

// const bookRouter = require('./router/book/book')
// app.use(['/book' , '/books'], bookRouter);





//to connect  our database my_goodreads
mongoose.connect(`${URL}/my_goodreads`).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.error(err);
})//connect


//to listen server in port
app.listen(PORT,err=>{
    if(!err) return console.log(`server start at port ${PORT}`);
    console.log(err);
})//listen