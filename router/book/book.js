const express = require('express');
const reuter = express.Router()
const { populate } = require('../../model/books/book');
const bookModel = require('../../model/books/book')

reuter.get('/',async (req ,res)=>{

    try {
      const books =   await bookModel.find({}).populate('book').populate('auther').populate('rating');
      return res.json(books);
    } catch (err) {
        res.status(500).send(err)
    }
})


reuter.get('/:id',(req ,res)=>{
   try {
        bookModel.find({_id: req.params.id}, (err, book)=>{
            if(!err) return res.json(book); 
        }).populate('book').populate('auther').populate('rating')
   } catch (err) {
    res.status(500).send(err)
   }
})



reuter.post('/', async (req ,res)=>{
    try {
        const book ={
        ...req.body 
        }
        bookModel.create(book ,(err , createbook)=>{
            if(!err) return res.json(createbook);
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

reuter.put('/:id',async (req ,res)=>{
    try {
        bookModel.updateOne({_id: req.params.id},{ 
            name: req.body.name,
            img: req.body.img,
            status: req.body.status,
            summary: req.body.summary,
            age: req.body.age},(err, book)=>{
            if(!err) return res.json(book);
           
        })
    } catch (error) {
        res.status(500).send(error)
    }
   
})

reuter.delete('/:id',async (req ,res)=>{
try {
    bookModel.deleteOne({_id: req.params.id},(err, book)=>{
        if(!err) return res.json(book);
        
    })
} catch (error) {
    res.status(500).send(error)
}
    
})



module.exports = reuter ; 