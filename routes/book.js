const express = require('express');
const router = express.Router()
const { populate } = require('../model/books/rating');
const bookModel = require('../model/books/book');




router.get('/',async (req ,res)=>{

    try {
      const books =   await bookModel.find({}).populate('rating') ;
      
      return res.json(books);
    } catch (err) {
        res.status(500).send(err)
    }
})

// //get author by id
// router.get('/:id',async(req,res)=>{
//     const id=req.params.id;
//     try{
//      const author= await authorModel.find({ID:id});
//       return res.json(author);
//    }
//    catch(err){
//       res.status(500).send(err);
//    } 
//  })

router.get('/:id',async (req ,res)=>{
   try {
       const book = await bookModel.find({_id: req.params.id});
         return res.json(book)
   } catch (err) {
    res.status(500).send(err)
   }
})


router.post('/',async(req,res) =>{ 
    
    try {
       const book = await bookModel.create(req.body);
       console.log(book);
       return res.sataus(200).json(book);
      
    } catch (error) {
     
        return res.status(500).send(error);
}
})



router.put('/:id',async (req,res)=>{
    const id=req.params.id;

    try{
    const book= await bookModel.updateOne({ID:id},{$set:req.body});
     return res.json(book);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

// router.delete('/:id',async(req,res)=>{
//     const id=req.params.id;
//     try{
//     const author= await authorModel.deleteOne({ID:id});
//      return res.json(author);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })

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