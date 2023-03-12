const express = require('express');
const userModel = require('../model/auth/user/user');
const { count } = require('../model/books/book');
const router = express.Router();
const {authUser} = require ('../middlewares/auth');

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
router.get("/all/page/:page",authUser,async(req,res)=>{
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

// router.get("/all",async(req,res)=>{
//     try {
//         cal_avreg();
//      const books = await bookModel
//      .find({},{ img: 1, name: 1,avg_rate:1, author: 1,bookUser:1 })
//      .populate({path: 'author',select: {'firstName':1,"_id":0}})
//      .populate({path: 'bookUser',select: {'rating':1,'status':1,"_id":0}});
//         return res.json(books);
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// })//get


//display all books with filter status

// router.get('/home/:status/:userID',async (req,res)=>{
//     try{
 
//     const details = await bookUserModel 
//         .find({status:req.params.status,user:req.params.userID},{status:1,rating:1,book:1})
//         .populate({path:'book',model:'book',select:{img: 1, name: 1,avg_rate:1}
//             ,populate:{
//                 path:'author',
//                 model:'author',
//                 select:{'firstName':1,'lastName':1,"_id":0}
//             }})
//         return res.json(details);

router.get('/home/page/:page/:status/:userID',authUser,async (req,res)=>{
    try{
    const page=req.params.page;
    const limit=5;
    const bookModel=await bookModel.find({}).count();
    const totalPages=Math.ceil(bookModel/limit);

    const books = await bookUserModel 
        .find({status:req.params.status,user:req.params.userID},{status:1,rating:1,book:1})
        .populate({path:'book',model:'book',select:{img: 1, name: 1,avg_rate:1}
            ,populate:{
                path:'author',
                model:'author',
                select:{'firstName':1,'lastName':1,"_id":0}
            }})
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