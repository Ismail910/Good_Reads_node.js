const express=require('express');
const bookModel = require('../model/books/book');
const authorModel = require('../model/author/author');
const CategoryModel = require('../model/Category/Category');
const router = express.Router();
const popularBooks=[];
router.get('/popularBook', async (req, res)=>{
    try{
        const popularBook = await bookModel.find({},{'name':1, 'img':1,'summary':1,'avg_rate':1,"category":1,"id":1})
        .sort({avg_rate: -1}).limit(5)
        .populate({path:'category', select: {'name':1, _id:0}});
        console.log(popularBook);
        popularBooks=popularBook;
        return res.json(popularBook);
    }catch(err){
        res.status(500).send(err);
    }
})

///////////////// popular author   aggregate([{$group: {_id:"$book", avg_val:{$avg:"$rating"}}}]);

router.get('/popularAuthor', async (req,res)=>{
    try{
        const popularAuthors = await bookModel.aggregate([
            {
              $sort: { avg_rate: -1 }
            },
            {
              $limit: 5
            },
            {
              $group: {
                _id: "$author",
                count: { $sum: 1 }
              }
            },
            {
              $sort: { count: -1 }
            }
          ]);

          let respopularAuthors = await Promise.all(  //wait to store data in array 
            popularAuthors.map(async (element) => {
              return authorModel.find({_id: element._id}, {firstName: 1, lastName: 1, photo: 1});
            })
          );
          
          
 /////////////////////////////////////////////////////////////////
        // const popularBook = await bookModel.aggregate([
        //     {
        //       $group: {
        //         _id: "$author",
        //         count: { $sum: 1 }
        //       }
        //     },
        //     {
        //       $sort: {
        //         count: -1
        //       }
        //     },
        //     {
        //       $limit: 5
        //     }
        //   ]);
        //   console.log(popularBook);


        return res.json(respopularAuthors);
    }catch(err){
        res.status(500).send(err);
       }
    }
)


router.get('/popularCategory', async (req,res)=>{
    try{
       
        const popularBook = await bookModel.find({},{'avg_rate':1,"category":1})
        .sort({avg_rate: -1}).limit(5)
        // .populate({path:'category', select: {'name':1, _id:0}})
        //const popularCategory = await CategoryModel.find({_id:},{})
         const data = popularBook.forEach(async (ele )=>{
            await CategoryModel.find({id:ele.category},{})
        })
        console.log(data);

        console.log(popularBook);

        return res.json({"sortAuthor":"jjj"});
    }catch(err){
        res.status(500).send(err);
       }
    }
)
    
module.exports = router; 

