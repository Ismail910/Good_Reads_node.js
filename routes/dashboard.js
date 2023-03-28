const express = require('express');
const router = express.Router();
const authorModel = require('../model/author/author');
const bookModel = require('../model/books/book');
const userModel = require ('../model/auth/user/user');
const bookUserModel = require('../model/books/bookUser');

router.get('/authors',async(req,res)=>
{

    try
    {
    const total=await authorModel.find({}).count();
    return res.json({totalAuthors:total});
    }catch(error)
    {
        return res.status(500).send(error);

    }

});

router.get('/books',async(req,res)=>
{

    try
    {
    const total=await bookModel.find({}).count();
    return res.json({totalBooks:total});
    }catch(error)
    {
        return res.status(500).send(error);

    }

});


router.get('/users',async(req,res)=>
{

    try
    {
    const total=await userModel.find({isAdmin:false}).count();
    return res.json({totalUsers:total});
    }catch(error)
    {
        return res.status(500).send(error);

    }

});


router.get('/statusReading',async(req,res)=>
{

    try
    {
    
      const total=await bookUserModel.aggregate( [{
        $group: {
          _id:"$status",
          count:{ $count:{} }
         } 
    
      }]);

    return res.json({totalStatusReading:total});
    }catch(error)
    {
        return res.status(500).send(error);

    }

});

router.get('/topAuthors',async(req,res)=>{
    try
    {
       const topAuthors=await bookModel.aggregate(
        [
            { 
               $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "_id",
                 as: "author"
             }
             },
             {
                $group:{
                 _id:"$author",
                 avg:{$avg:"$avg_rate"}
                }
               }
               ,
               {
                   $sort: { avg:-1 , _id:1},
               },
            

        ]);


        return res.json(topAuthors);

    }catch(error)
    {
        return res.status(500).send(error);

    }
})






module.exports = router;