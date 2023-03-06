const express = require('express');
const router = express.Router();

//model
const bookModel = require('../model/books/book')
const bookUserModel = require('../model/books/bookUser');
router.get('/all',async(req,res)=>{
    try {

       const books = await bookModel
       .find({}, { img: 1, name: 1, author: 1,bookUser:1 })
       .populate({path: 'author',select: {'firstName':1,"_id":0}})
       .populate({path: 'bookUser',select: {'rating':1,'status':1,"_id":0}});

      const avrgrating = await bookUserModel
       .aggregate([{$group: {_id:"$book", avg_val:{$avg:"$rating"}}}]);
      
    //    console.log(avrgrating);
    //    console.log(avrgrating.length);

       avrgrating.forEach( async(element) => {
           await bookModel.updateOne({_id:element._id},{$set:{avg_rate:element.avg_val}})
       });
     // const setarvg = await 

        return res.json(books);
    } catch (error) {
        return res.status(500).send(error);
    }
})//get
//  https://www.statology.org/mongodb-average/
//   https://stackoverflow.com/questions/26810599/calculating-average-in-mongoose
//  https://www.youtube.com/watch?v=mSfV6VTKtbw


module.exports=router;