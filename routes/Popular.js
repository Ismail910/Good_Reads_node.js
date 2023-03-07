const express=require('express');
const bookAdminModel = require('../model/books/book');
const router = express.Router();

router.get('/popularB', async (req, res)=>{
    try{
        const popularBook = await bookAdminModel.find({}, {'name':1, 'img':1,'summary':1,'avg_rate':1}).
        populate({path:'BookUser', select: {'rating':1, 'status':1, _id:0}});
        const sortData = popularBook.sort('avg-rate').limit(5);
        return res.json(sortData);
    }catch(err)
    {
        res.status(500).send(err);
    }
})
router.get('/popularA', async (req,res))

module.exports = router; 

