const express = require('express');
const router = express.Router();

//model
const authorModel = require('../model/author/author');

//create author
router.post('/',async(req,res) =>{ 
    
    try {
       const author = await authorModel.create(req.body);
       //console.log("created author");
       return res.sataus(200).json(author);
    } catch (error) {
      //  console.log("error");
        return res.status(404).send(error);
}
})//post

//get all auuthor
router.get('/',async(req,res)=>{
    try{
     const author=  await authorModel.find({});
       return res.json(author);
    }
    catch(err){
       res.status(400).send(err);
    }
})//get

//get author by id
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
     const author= await authorModel.find({ID:id});
      return res.json(author);
   }
   catch(err){
      res.status(400).send(err);
   } 
 })//get author by id

 //delete all author 
 router.delete('/',async(req,res)=>{
    const id=req.params.id;
    try{
    const author= await authorModel.deleteOne({});
     return res.json(author);
  }
  catch(err){
     res.status(400).send(err);
  }
})//delete all author

 //delete author by id
 router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
    const author= await authorModel.deleteOne({ID:id});
     return res.json(author);
  }
  catch(err){
     res.status(400).send(err);
  }
})//delete author by id

//update author by id
router.put('/:id',async (req,res)=>{
    const id=req.params.id;

    try{
    const author= await authorModel.updateOne({ID:id},{$set:req.body});
     return res.json(author);
  }
  catch(err){
     res.status(400).send(err);
  } 
})//update author by id

module.exports = router;

