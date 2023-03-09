const express = require('express');
const router = express.Router();
const reviewModel = require('../model/books/Reviews')
const bookModel = require('../model/books/book');


//get all reviews
router.get('/', async(req , res)=>{
    try{
        const reviews= await reviewModel.find({});
        return res.json(reviews);
    }catch(err){
        res.status(404).send(err);
    }
})

//get review by id

router.get('/:id', async (req,res)=>{
    try{
        const review = await reviewModel.findById({_id:req.params.id});
        return res.json(review);
    }
    catch(err){
        res.status(404).send(err);
    }
})


//create review

router.post('/',async(req,res)=>{
    try{
        const review = await reviewModel.create(req.body);
        await bookModel.updateOne({'reviews': review._id}) 
        return res.json(review);
    }
    catch(err){
        return res.status(500).send(err);
    }
})



//update review
router.put('/:id',async(req,res)=>{
    try{
        const review = await reviewModel.updateOne({_id:req.params.id},{$set:req.body});
        return res.json(review);
    }
    catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;





