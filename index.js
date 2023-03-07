const express=require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const PORT= process.env.Port || 5000 ;


const URL = process.env.url || "mongodb://127.0.0.1:27017" ;

// router author
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const bookUserRouter = require("./routes/bookUser");
const userRegisterRouter = require("./routes/userRegister");
const userLoginRouter= require("./routes/userLogin");
<<<<<<< HEAD
const popularRouter= require("./routes/Popular");


//const reviewsRouter = require("./routes/reviews");

const categoryRouter=require("./routes/Category");

const homeUserRouter = require("./routes/homeUser")
=======
const reviewsRouter = require("./routes/reviews");
const categoryRouter=require("./routes/Category");
const homeUserRouter = require("./routes/homeUser");
>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a

////////////////Routers
app.use(['/book' , '/books'], bookRouter);
app.use('/admin/author',authorRouter);
<<<<<<< HEAD

app.use('/popular' , popularRouter);

app.use('/category' , categoryRouter);

=======
app.use('/category' , categoryRouter);
>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a
app.use('/bookUser' , bookUserRouter);
app.use('/register' , userRegisterRouter);
app.use('/login' , userLoginRouter);
app.use('/reviews' , reviewsRouter);
app.use('/home',homeUserRouter);


<<<<<<< HEAD
app.use('/home',homeUserRouter);



=======
>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a
//middleware auth
const auth = require("./middlewares/auth");
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
//end middleware auth



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