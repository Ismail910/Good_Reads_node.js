const express = require('express');
const router = express.Router();

//model
const bookModel = require('../model/books/book')

router.get('/all',async(req,res)=>{
    try {
        const books = await bookModel
        .find({}, { img: 1, name: 1, author: 1 })
        .populate({path: 'author',select: {'firstName':1,"_id":0}})
          
        return res.json(books);
    } catch (error) {
        return res.status(500).send(error);
    }
})//get


module.exports=router;