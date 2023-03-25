const express = require('express');
const router = express.Router();
const {authAdmin} = require("../middlewares/auth");
const {storageAuthor}=require("../middlewares/upload");
require('dotenv').config();
//model
const authorModel = require('../model/author/author');
const bookModel = require('../model/books/book');



router.post('/',[authAdmin,storageAuthor],async(req,res) =>{ 
    try {

        const objAuthor = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth:req.body.dateOfBirth,
          photo: req.file.path
       };
      
       console.log(objAuthor);

       const author = await authorModel.create(objAuthor);
      return res.json(author);
    } catch (error) {
        return res.send(error);
       }
})

router.get('/page/:page',async(req,res)=>{
    try{
      const page=req.params.page;
      const limit = process.env.limit;
      const countAuthors=await authorModel.find({}).count();
      const totalPages=Math.ceil(countAuthors/limit);
      const authors=  await authorModel.find({},
      {ID:1,photo:1,firstName:1,lastName:1,dateOfBirth:1,books:1})
      .limit(limit).skip((page-1)*limit).exec();
      const objAuthors=
      {
         pages:
         {
            totalPages,
            page
         },
         data:authors
      };
       return res.json(objAuthors);
    }
    catch(err){
        res.status(500).send(err);
    }
})//get

//get author by id
router.get('/:id/:userId',async(req,res)=>{


    const id=req.params.id;
    const userId=req.params.userId;
    try{
   const author = await authorModel.find({ID:id},{photo:1,firstName:1,lastName:1,dateOfBirth:1,books:1})
   .populate({path:'books',model:'book',select: {'name':1,img:1,"_id":0},populate:{path:'bookUser',model:'bookUser',
   select:{rating:1,status:1},match:{user:userId}}})
   return res.send(author);
// =======
//    .populate({path:'books',model:'book',select: {'name':1,"_id":0},
//    populate:{path:'bookUser',model:'bookUser', select:{rating:1,status:1},match:{user:userId}}})
//    // .populate({path: 'bookUser',select: {'rating':1,'status':1,"_id":0}})
//    // .populate({path:'user',match:{"email":req.query.email}});
//       return res.json(author);
// >>>>>>> 2333421426caff4d65cac799a916f01879f16cc7
   }
   catch(err){
      res.status(500).send(err);
   } 
 })//get author by id

 //delete all author 

 router.delete('/',authAdmin,async(req,res)=>{
    try{
    const author= await authorModel.deleteMany({},{ID:1,photo:1,firstName:1,lastName:1,
        dateOfBirth:1});
   const book= await bookModel.deleteMany({},{});
        
     return res.json(author);
  }
  catch(err){
     res.status(500).send(err);
  }
})//delete all author    


//  //delete author by id
//  router.delete('/:id',async(req,res)=>{
//     const id=req.params.id;
//     try{
//     const author= await authorModel.deleteOne({ID:id},{ID:1,photo:1,firstName:1,lastName:1,
//         dateOfBirth:1});
//      return res.json(author);
//   }
//   catch(err){
//      res.status(500).send(err);
//   }
// })//delete author by id

//delete author and delete his all books 
router.delete('/:id',authAdmin,async(req,res)=>{
   try{
      const idAuthor=req.params.id
       await bookModel.deleteMany({author:idAuthor});

       //.populate({path:"author",match:{"ID":idAuthor}});
       await authorModel.deleteOne({_id:idAuthor}); 
       return res.status(200).json("deleted");
 }
 catch(err){
    res.status(500).send(err);
 }
});

//update author by id
router.put('/:id',[authAdmin,storageAuthor],async (req,res)=>{
    const id=req.params.id;
    try{
      const objAuthor = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         dateOfBirth:req.body.dateOfBirth,
      };
      if(req.file)
      {
         objAuthor.photo=req.file.path;

      }
     
      console.log(objAuthor);
    const author= await authorModel.updateOne({ID:id},{$set:objAuthor},{ID:1,photo:1,firstName:1,lastName:1,
        dateOfBirth:1});
     return res.json(author);
  }
  catch(err){
     res.status(500).send(err);
  } 
})//update author by id




router.get('/',async(req,res)=>{
   try{
     const authors=  await authorModel.find({},
       {ID:1,firstName:1,lastName:1});
      return res.json(authors);
   }
   catch(err){
       res.status(500).send(err);
   }
});


module.exports = router;

