const express=require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const PORT= process.env.Port || 3000 ;
const URL = process.env.url || "mongodb://localhost" ;

// router author
const authorRouter = require("./routes/author");
app.use('/admin/author',authorRouter);

////////////////Routers

const bookRouter = require('./router/book/book')
app.use(['/book' , '/books'], bookRouter);


//to connect  our database my_goodreads
mongoose.connect(`${URL}/goodReads`).then(()=>{
    console.log(`connect mongoose is successfully!`);
}).catch((err)=>{console.log(err);})

app.listen(PORT,(err)=>{
    if(!err) return console.log(`server start at port ${PORT}`);
    console.log(err);
})//listen