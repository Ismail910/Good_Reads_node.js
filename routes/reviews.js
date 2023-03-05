const express =  require('express')
const router = express.Router();

const reviewModel = require('../model/books/Reviews');

////////////// getter
router.get('/', async (req, res)=>{
    try {
        const reviews = await reviewModel.find({});
        return res.json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.get('/:id', async (req, res)=>{
    try {
        const reviews = await reviewModel.findById({_id:req.params.id});
        return res.json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
})

//////////////// post

router.post('/', async (req, res)=>{
    try {
        const reviews = await reviewModel.create(req.body);
        return res.json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
})

/////////////////// update

router.put('/:id', async (req, res)=>{
    try {
        const reviews = await reviewModel.updateOne({_id:req.params.id},{$set:req.body});
        return res.json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
})

//////////////// delete


router.delete('/:id',async(req,res)=>{
    try{
    const reviews= await reviewModel.deleteOne({_id:req.params.id});
     return res.json(reviews);
  }
  catch(err){
     res.status(500).send(err);
  }
})

module.exports = router;