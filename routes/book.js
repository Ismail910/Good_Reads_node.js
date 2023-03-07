const express = require('express');
const router = express.Router()

const bookModel = require('../model/books/book');
const bookUserModel = require('../model/books/bookUser');
const reviewModel = require('../model/books/Reviews');




router.get('/',async (req ,res)=>{

    try {
<<<<<<< HEAD
      const books =   await bookModel.find({},{})
      .populate('category').populate('author') ; 
=======
      const books =   await bookModel.find({});
      
>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a
      return res.json(books);
    } catch (err) {
         return  res.status(500).send(err)
    }
})

router.get('/:id',async (req ,res)=>{
   try {
<<<<<<< HEAD
       const book = await bookModel.find({_id: req.params.id},{'name': 1,'img':1, "summary":0,"category":1,"author":1})
     
=======
       const book = await bookModel.find({_id: req.params.id});

>>>>>>> e0e72d64b7ca539dc17a7a5cb19fd53a19f86b6a
         return res.json(book)
   } catch (err) {
    res.status(500).send(err)
   }
})

router.post('/',async(req,res) =>{ 
    
    try {
       const book = await bookModel.create(req.body);
       console.log(book);
       return res.json(book);
      
    } catch (error) {
         res.status(500).send(error);
}
})

router.put('/:id',async (req,res)=>{
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
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

 
// router.delete('/',async(req,res)=>{
//    try{
    
//      const book= await bookModel.deleteMany({});
//     return res.json(book);
//  }
//  catch(err){
//     res.status(500).send(err);
//  }
// })

router.delete('/:id',async(req,res)=>{
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



