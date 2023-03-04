const express = require('express');
const router = express.Router()


const bookUserModel = require('../model/books/bookUser');


router.get('/', async (req ,res)=>{
    try{
        const rating = await bookUserModel.find({});
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})

//get rating by id
router.get('/:id', async (req, res)=>{
    try{
        const rating = await bookUserModel.findById({_id:req.parmas.id});
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})

//create rating
router.post('/' , async (req, res)=>{
    try{
        const rating = await bookUserModel.create(req.body);
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})



//  //delete all author 
//  router.delete('/', async (req, res)=>{
//     try{
//         const rating = await bookUserModel.deleteMany({});
//         return res.json(rating);
//     }catch(err){
//         res.status(500).send(err);
//     }
//  })

//  //delete rate by id
//  router.delete('/:id',async(req,res)=>{
//     try{
//     const rating= await bookUserModel.deleteOne({_id:req.params.id});
//      return res.json(rating);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })

//updat rate
router.put('/:id', async(req,res)=>{
    try{
        const rating = await bookUserModel.updateOne({_id:req.params.id},{$set:req.body});
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;