const express=require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const PORT= process.env.Port || 3350 ;
const URL = process.env.url || "mongodb://127.0.0.1:27017" ;

// router author
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const bookUserRouter = require("./routes/bookUser");
const userRegisterRouter = require("./routes/userRegister");
const userLoginRouter= require("./routes/userLogin");
// const reviewsRouter = require("./routes/reviews");




////////////////Routers
app.use(['/book' , '/books'], bookRouter);
app.use('/admin/author',authorRouter);
app.use('/bookUser' , bookUserRouter);
app.use('/register' , userRegisterRouter);
app.use('/login' , userLoginRouter);


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