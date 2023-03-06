const express = require('express');
const router = express.Router()


const bookUserModel = require('../model/books/bookUser');


router.get('/', async (req ,res)=>{
    try{
        const bookUser = await bookUserModel.find({});
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})

//get bookUser by id
router.get('/:id', async (req, res)=>{
    try{
        const bookUser = await bookUserModel.findById({_id:req.parmas.id});
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})

//create bookUser
router.post('/' , async (req, res)=>{
    try{
        const bookUser = await bookUserModel.create(req.body);
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})


//  //delete rate by id
//  router.delete('/:id',async(req,res)=>{
//     try{
//     const bookUser= await bookUserModel.deleteOne({_id:req.params.id});
//      return res.json(bookUser);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })

//updat rate
router.put('/:id', async(req,res)=>{
    try{
        const bookUser = await bookUserModel.updateOne({_id:req.params.id},{$set:req.body});
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;