const express = require('express');
const router = express.Router()
const {authUser} = require ('../middlewares/auth');
const bookUserModel = require('../model/books/bookUser');
const bookModel = require('../model/books/book');


router.get('/', async (req ,res)=>{
    try{
        const bookUser = await bookUserModel.find({});
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})

//get bookUser by id
router.get('/:id', async (req, res)=>{
    try{
        const bookUser = await bookUserModel.findById({_id:req.params.id});
        return res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }
})

//create bookUser  
router.post('/' ,async (req, res)=>{
            try{
            const rating = await bookUserModel.create(req.body);
            console.log(rating._id);
            await bookModel.updateOne({_id:rating.book},{$push:{'bookUser':rating._id}})
            return res.json(rating);
            }catch(err){
                console.log(err);
                res.status(500).send(err);
            }  
})

//updat rate
router.put('/:id', async(req,res)=>{
    try{
        console.log("asd1");
        const bookUser = await bookUserModel.updateOne({_id:req.params.id},{$set:req.body});
        await bookModel.updateOne({_id:bookUser.book},{$set:{'bookUser':bookUser._id}})
        console.log(bookUser);
        console.log("bookUser");
         res.json(bookUser);
    }catch(err){
        res.status(500).send(err);
    }

})

////////////////////////// (
    router.delete('/:id',authUser,async(req,res)=>{
        try{
        const bookUser= await bookUserModel.deleteOne({_id:req.params.id});
         return res.json(bookUser);
      }
      catch(err){
         res.status(500).send(err);
      }
    })
// router.delete('/',authUser,async(req,res)=>{
//     try{
     
//       const rating= await bookUserModel.deleteMany({});
//      return res.json(rating);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
//  })

module.exports = router;