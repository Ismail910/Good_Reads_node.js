const express = require('express');
const router = express.Router();
const {authAdmin} = require("../middlewares/auth");
const {storageAuthor}=require("../middlewares/upload");
require('dotenv').config();
//model
const authorModel = require('../model/author/author');
const bookModel = require('../model/books/book');
const bookUserModel = require('../model/books/bookUser')

const fs = require('fs');
const CategoryModel = require('../model/Category/Category');
router.post('/',[authAdmin,storageAuthor],async(req,res) =>{ 
    try {

        const objAuthor = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth:req.body.dateOfBirth,
          photo: req.file.path
       };

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
router.get('/authorID/:id/:userId',async(req,res)=>{


    const id=req.params.id;
    const userId=req.params.userId;
    try{

   const author = await authorModel.find({ID:id},{photo:1,firstName:1,lastName:1,_id:1,dateOfBirth:1,books:1})
   .populate({path:'books',model:'book',select: {'name':1,avg_rate:1,img:1,"_id":1,bookUser:1,category:1}
    ,populate:[{path:'category',model:'category',select:{name:1}},
    {path:'bookUser',model:'bookUser',select:{rating:1,status:1,user:1},match:{user:userId}} ] 
})
      let booksAuthor =[];
      for (i=0;i<author[0].books.length;i++){
         
         try {
            
            
            let userRating = null;let userStatus=null;
            if (author[0].books[i].bookUser?.length > 0) {
               

               for(j=0;j<author[0].books[i].bookUser?.length;j++){
                  if(userId==author[0].books[i].bookUser[j].user){
                     userRating = author[0].books[i].bookUser[j].rating;
                     userStatus = author[0].books[i].bookUser[j].status;
                  }
               }
            }
            const book = {
               author: {
                  firstName: author[0].firstName,
                  lastName: author[0].lastName
               },
               category: {
                  id: author[0].books[i].category._id,
                  name: author[0].books[i].category.name
               },
               _id: author[0].books[i]._id,
               name: author[0].books[i].name,
               img: author[0].books[i].img,
               avg_rate: author[0].books[i].avg_rate,
               id: author[0].books[i].id
            };
         
            booksAuthor[i] = {
               rating: userRating || 1,
               status: userStatus || 'wantToRead',
               book: book
            };
         } catch (error) {
            console.log(error);
         }
      }
   const result = {_id:author[0]._id,photo:author[0].photo,firstName:author[0].firstName,lastName:author[0].lastName
                  ,dateOfBirth:author[0].dateOfBirth,books:booksAuthor};
   return res.send(result);


   }
   catch(err){
      res.status(500).send(err);
   } 
 })//get author by id


 router.get('/search/:search',async(req,res)=>{
   try{
   const query = req.params.search;
   
   const category = await authorModel.find({
      $or: [
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
    ]
   })
   .sort({ lastName: 1, firstName: 1 })  // sort by last name and then first name
      .limit(10); // limit to 10 results
      return res.json(category);
   }  
   catch(err){
       res.status(500).send(err);
   }
})//get


 //delete all author 

 router.delete('/',authAdmin,async(req,res)=>{
    try{
    const author= await authorModel.deleteMany({},{ID:1,photo:1,firstName:1,lastName:1,
        dateOfBirth:1});
       bookModel.deleteMany({},{});
        
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
router.delete('/:id',async(req,res)=>{
   try{
      const idAuthor=req.params.id

      const bookIds = await bookModel.distinct('_id', { author: idAuthor });
      
       const result = await CategoryModel.updateMany(
         { books: { $in: bookIds } },
         { $pull: { books: { $in: bookIds } } }
       );

       await bookModel.deleteMany({author:idAuthor});
       const authorPhoto = await authorModel.find({_id:idAuthor},{photo:1});
       fs.unlink(authorPhoto[0].photo, (err) => {
         if (err) throw err;
         console.log('File deleted!');
       });
       await authorModel.deleteOne({_id:idAuthor}); 
      
       return res.status(200).json("deleted");
 }
 catch(err){
   console.log(err);
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
         book : req.body.book
      };
      if(req.file)
      {
         objAuthor.photo=req.file.path;
      }
      
    const author= await authorModel.updateOne({ID:id},{$set:objAuthor},
      {ID:1,photo:1,firstName:1,lastName:1,dateOfBirth:1});
     return res.json(author);
  }
  catch(err){
     res.status(500).send(err);
  } 
})//update author by id




router.get('/all',async(req,res)=>{
   try{
     const authors=  await authorModel.find({},{firstName:1,lastName:1});
      return res.json(authors);
   }
   catch(err){
       res.status(500).send(err);
   }
});


module.exports = router;

