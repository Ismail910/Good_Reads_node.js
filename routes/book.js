const express = require('express');
const router = express.Router()

const bookModel = require('../model/books/book');
const bookUserModel = require('../model/books/bookUser');
const reviewModel = require('../model/books/Reviews');
const authorModel = require('../model/author/author');
const CategoryModel =require('../model/Category/Category');
const {authAdmin} = require("../middlewares/auth");
const {storageBook}=require('../middlewares/upload');



router.get('/page/:page', async (req, res) => {
   try {
      const page = req.params.page;
      const limit = 5;
      const countbooks = await bookModel.find({}).count();
      const totalPages = Math.ceil(countbooks / limit);
      const books = await bookModel.find({}, { 'id':1,'name': 1, 'img': 1,'category': 1, 'author': 1 })
      .populate({ path: 'category', select: { 'name': 1 } })
      .populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } })
         .limit(limit)
         .skip((page - 1) * limit)
         .exec();
      const objbooks =
      {
         pages:
         {
            totalPages,
            page
         },
         data: books
      };
      return res.json(objbooks);
   } catch (err) {
      return res.status(500).send(err)
   }
})

router.get('/:id', async (req, res) => {
   try {
      const book = await bookModel.find({ _id: req.params.id })
         .populate({ path: 'bookUser', select: { 'rating': 1, 'status': 1 } })
         .populate({ path: 'reviews', select: { 'comment': 1, 'like': 1, 'date': 1 } })
         .populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } })
         .populate({ path: 'category', select: { 'name': 1 } })
      return res.json(book)
   } catch (err) {
      res.status(500).send(err)
   }
})

router.post('/',[authAdmin,storageBook], async (req, res) => {
   try {

      const objBook = {
         name: req.body.name,
         summary: req.body.summary,
         category:req.body.category,
         author:req.body.author,
          img: req.file.path
      };
      const book = await bookModel.create(objBook);
      await authorModel.updateOne({ _id: book.author }, { $push: { 'books': book._id } });
      await CategoryModel.updateOne({ _id: book.category }, { $push: { 'books': book._id } });
      return res.json(book);
   } catch (error) {
      res.status(500).send(error);
   }
})

router.post('/',authAdmin,async(req,res) =>{ 
    
    try {

       const book = await bookModel.create(req.body);
      
       return res.json(book);
      
    } catch (error) {
         res.status(500).send(error);
}
})

router.put('/:id',authAdmin,async (req,res)=>{
    const id=req.params.id;
    const data = {
      name : req.body.name,
      img : req.body.img,
      name : req.body.name,
      category : req.body.category,
      author : req.body.author
    }
    try{
    const book= await bookModel.updateOne({_id:id},{$set:data});
    //await bookModel.updateOne({_id:id},{$push:{'bookUser':book.bookUser} });
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

//////   (this mathod just used for test)

// router.delete('/',async(req,res)=>{
//    try{
//      const book= await bookModel.deleteMany({});
//     return res.json(book);
//  }
//  catch(err){
//     res.status(500).send(err);
//  }
// })

router.delete('/:id',authAdmin,async(req,res)=>{
    try{
      await bookUserModel.deleteMany({book:req.params.id});
      await reviewModel.deleteMany({ book:req.params.id});
      const book= await bookModel.deleteOne({_id:req.params.id});
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  }
})


module.exports = router;



