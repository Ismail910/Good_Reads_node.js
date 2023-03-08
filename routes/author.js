const express = require('express');
const router = express.Router();

//model
const authorModel = require('../model/author/author');
const bookModel = require('../model/books/book')
// //create author
router.post('/',async(req,res) =>{ 
    
    try {
       const author = await authorModel.create(req.body);
       //console.log("created author");
       return res.status(200).json(author);
    } catch (error) {
      //  console.log("error");
        return res.status(500).send(error);
}
})//post

//get all auuthor
router.get('/',async(req,res)=>{
    try{
     const author=  await authorModel.find({},{ID:1,photo:1,firstName:1,lastName:1,
                                                dateOfBirth:1,books:1});
       return res.json(author);
    }
    catch(err){
        res.status(500).send(err);
    }
})//get

//get author by id
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
     const author= await authorModel.find({ID:id},{ID:1,photo:1,firstName:1,lastName:1,

                                                dateOfBirth:1,books:1,});
   // const author= await authorModel.find({_id:id}).populate('book');
      return res.json(author);
   }
   catch(err){
      res.status(500).send(err);
   } 
 })//get author by id

 //delete all author 

 router.delete('/',async(req,res)=>{
    const id=req.params.id;
    try{
    const author= await authorModel.deleteMany({},{ID:1,photo:1,firstName:1,lastName:1,
        dateOfBirth:1});
   const book= await bookModel.deleteMany({},{});
        
     return res.json(author);
  }
  catch(err){
     res.status(500).send(err);
  }
})//delete all author    


//  //delete author by id
//  router.delete('/:id',async(req,res)=>{
//     const id=req.params.id;
//     try{
//     const author= await authorModel.deleteOne({ID:id},{ID:1,photo:1,firstName:1,lastName:1,
//         dateOfBirth:1});
//      return res.json(author);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })//delete author by id

//delete author and delete his all books 
router.delete('/:id',async(req,res)=>{
   try{
   const book= await bookModel.deleteMany({"author":req.params.id})//.populate("author");
   const author = await authorModel.findByIdAndDelete(req.params.id); 
   return res.json(author);
 }
 catch(err){
    res.status(500).send(err);
 }
})

//update author by id
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
    const author= await authorModel.updateOne({ID:id},{$set:req.body},{ID:1,photo:1,firstName:1,lastName:1,
        dateOfBirth:1});
     return res.json(author);
  }
  catch(err){
     res.status(500).send(err);
  } 
})//update author by id


module.exports = router;

