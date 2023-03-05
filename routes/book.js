const express = require('express');
const router = express.Router()

const bookModel = require('../model/books/book');
const authorModel = require('../model/author/author');




router.get('/',async (req ,res)=>{

    try {
      const books =   await bookModel.find({}).populate('bookUser').populate('author') ;
      
      return res.json(books);
    } catch (err) {
         return  res.status(500).send(err)
    }
})


router.get('/:id',async (req ,res)=>{
   try {
       const book = await bookModel.find({_id: req.params.id}).populate('bookUser').populate('author');

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

    try{
    const book= await bookModel.updateOne({_id:id},{$set:req.body});
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

router.delete('/:id',async(req,res)=>{
    try{
    const book= await bookModel.deleteOne({_id:req.params.id});
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  }
})





module.exports = router ; 