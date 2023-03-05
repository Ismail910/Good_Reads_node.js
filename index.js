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
const categoryRouter=require("./routes/Category");



////////////////Routers
app.use(['/book' , '/books'], bookRouter);
app.use('/admin/author',authorRouter);
app.use('/rating' , ratingRouter);
app.use('/category' , categoryRouter);




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