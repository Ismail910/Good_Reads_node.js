const express = require('express');
const router = express.Router()


const ratingModel = require('../model/books/rating');


// router.get('/', async (req ,res)=>{
//     try{
//         const rating = await ratingModel.find({});
//         return res.json(rating);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

//get rating by id
router.get('/:id', async (req, res)=>{
    try{
        const rating = await ratingModel.findById({_id:req.parmas.id});
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})

//create rating
router.post('/' , async (req, res)=>{
    try{
        const rating = await ratingModel.create(req.body);
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})



//  //delete all author 
//  router.delete('/', async (req, res)=>{
//     try{
//         const rating = await ratingModel.deleteMany({});
//         return res.json(rating);
//     }catch(err){
//         res.status(500).send(err);
//     }
//  })

//  //delete rate by id
//  router.delete('/:id',async(req,res)=>{
//     try{
//     const rating= await ratingModel.deleteOne({_id:req.params.id});
//      return res.json(rating);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })

//updat rate
router.put('/:id', async(req,res)=>{
    try{
        const rating = await ratingModel.updateOne({_id:req.params.id},{$set:req.body});
        return res.json(rating);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;