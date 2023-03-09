const express = require('express');
const { count } = require('../model/books/book');
const router = express.Router();

//model
const bookModel = require('../model/books/book')
const bookUserModel = require('../model/books/bookUser');


async function cal_avreg(){
       // calculate average for all books
       const avrgrating = await bookUserModel
       .aggregate([{$group: {_id:"$book", avg_val:{$avg:"$rating"}}}]);
      
       //assign average to book
       avrgrating.forEach( async(element) => {
           await bookModel.updateOne({_id:element._id},{$set:{avg_rate:element.avg_val}})
       });
}
//display all books with details
router.get("/all/page/:page",async(req,res)=>{
    try {
        cal_avreg();

      const page=req.params.page;
      const limit=5;
      const bookModel=await bookModel.find({}).count();
      const totalPages=Math.ceil(bookModel/limit);

     const books = await bookModel
     .find({},{ img: 1, name: 1,avg_rate:1, author: 1,bookUser:1 })
     .populate({path: 'author',select: {'firstName':1,"_id":0}})
     .populate({path: 'bookUser',select: {'rating':1,'status':1,"_id":0}})
     .limit(limit).skip((page-1)*limit).exec();

     const objBooks=
     {
        pages:
        {
           totalPages,
           page
        },
        data:books
     };
      return res.json(objBooks);
    } catch (error) {
        return res.status(500).send(error);
    }
})//get


//display all books with filter status
router.get('/home/page/:page?status?email',async (req,res)=>{
    try{
    const page=req.params.page;
    const limit=5;
    const bookModel=await bookModel.find({}).count();
    const totalPages=Math.ceil(bookModel/limit);

    const books = await bookModel
     .find({},{ img: 1, name: 1,avg_rate:1, author: 1,bookUser:1 })
     .populate({path: 'author',select: {'firstName':1,"_id":0}})
     .populate({path: 'bookUser',select: {'rating':1,'status':1,"_id":0},match:{"status" :req.query.status}})
     .populate({path:'user',match:{"email":req.query.email}})
     .limit(limit).skip((page-1)*limit).exec();

     const objBooks=
     {
        pages:
        {
           totalPages,
           page
        },
        data:books
     };
      return res.json(objBooks);

    } catch (error) {
        return res.status(500).send(error);
    }
})



module.exports=router;