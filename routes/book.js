const express = require('express');
const router = express.Router();
require('dotenv').config();
const fs = require('fs');

const bookModel = require('../model/books/book');
const bookUserModel = require('../model/books/bookUser');
const reviewModel = require('../model/books/Reviews');
const authorModel = require('../model/author/author');
const CategoryModel = require('../model/Category/Category');
const { authAdmin } = require("../middlewares/auth");
const { storageBook } = require('../middlewares/upload');
const { populate } = require('../model/counter/count');



router.get('/page/:page', async (req, res) => {
   try {
      const page = req.params.page;
      const limit = process.env.limit;
      const countbooks = await bookModel.find({}).count();
      const totalPages = Math.ceil(countbooks / limit);
      const books = await bookModel.find({}, { 'id': 1, 'name': 1, 'img': 1, 'category': 1, 'author': 1, 'summary': 1 })
         .populate({ path: 'category', select: { 'name': 1 } })
         .populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } })
         .limit(limit)
         .skip((page - 1) * limit)
         .exec();
      const objbooks =
      {
         pages:
         {
            totalPages,
            page
         },
         data: books
      };
      return res.json(objbooks);
   } catch (err) {
      return res.status(500).send(err)
   }
})

router.get('/:id/:userID', async (req, res) => {
   try {

      userID = req.params.userID
      book_id = req.params.id
      const book = await bookModel.find({ _id: book_id })
         .populate({
            path: 'bookUser', select: { 'rating': 1, 'status': 1, 'user': 1 ,'_id':1},
            match: { 'user': userID }
         })
         .populate({
            path: 'reviews',model:'reviews', select: { comment: 1, date: 1, changeLike: 1, user: 1 }, populate: {
               path: 'user',
               model: 'user',
               select: {'first_name':1,'id':1,'img':1,'last_name':1}
            }
         })
         .populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } })
         .populate({ path: 'category', select: { 'name': 1 } })
      console.log("asd");
      try {
         let userRating = null; let userStatus = null;let userStatusId = null;
         if (book[0].bookUser?.length > 0) {

            for (j = 0; j < book[0].bookUser?.length; j++) {
               if (userID == book[0].bookUser[j].user) {
                  userRating = book[0].bookUser[j].rating;
                  userStatus = book[0].bookUser[j].status;
                  userStatusId = book[0].bookUser[j]._id
               }
            }
         }

         // let reviews=[];

         // for(i= 0; i<book[0].reviews?.length; i++)
         // {
         //    if(book_id == book[0].reviews?.book )
         //       reviews=book[0].reviews[i]
         // }
         const bookDitils = {
            rating: userRating || 1,
            status: userStatus || 'wantToRead',
            user: userID,
            _id: userStatusId
         }

         const newBook = {
            author: {
               firstName: book[0].author?.firstName,
               lastName: book[0].author?.lastName
            },
            category: {
               name: book[0].category?.name
            },
            _id: book[0]._id,
            name: book[0].name,
            img: book[0].img,
            avg_rate: book[0].avg_rate,
            id: book[0].id,
            summary:book[0].summary,
            bookUser: bookDitils,
            reviews: book[0].reviews
         }

         console.log("bookDitils", newBook);
         return res.json(newBook)
      } catch (err) {
         console.log(err);
      }

      console.log(bookDitils);
      return res.json(bookDitils)
   } catch (err) {
      console.log(err);
      res.status(500).send(err)
   }
})

router.post('/', [authAdmin, storageBook], async (req, res) => {
   try {

      const objBook = {
         name: req.body.name,
         summary: req.body.summary,
         category: req.body.category,
         author: req.body.author,
         img: req.file.path
      };
      const book = await bookModel.create(objBook);
      await authorModel.updateOne({ _id: book.author }, { $push: { 'books': book._id } });
      await CategoryModel.updateOne({ _id: book.category }, { $push: { 'books': book._id } });
      return res.json(book);
   } catch (error) {
      res.status(500).send(error);
   }
})


router.put('/:id', [authAdmin, storageBook], async (req, res) => {
   // :authorID/:categoryID/:oldauthorID/:oldcategoryID
   try {
      const id = req.params.id;
      // const categoryID = req.params.categoryID
      // const authorID = req.params.authorID
      // const oldauthorID=req.params.oldauthorID
      // const oldcategoryID = req.params.oldcategoryID
      const objBook = {
         
         name: req.body.name,
         summary: req.body.summary,
         category: req.body.category,
         author: req.body.author,
      };
      if (req.file) {
         objBook.img = req.file.path;
      }
      // const book = await bookModel.updateOne({ _id: id }, { $set: objBook });
      // await authorModel.updateOne({_id:oldauthorID},{
      //    "$pull":{"books":{"_id":oldauthorID}}
      // })
      // await authorModel.updateOne({_id:authorID},{$push:{'books':book._id}})

      // await CategoryModel.updateOne({_id:oldcategoryID},{
      //    "$pull":{"books":{"_id":oldcategoryID}}
      // })
      // await CategoryModel.updateOne({_id:categoryID},{$push:{'books':book._id}})

   //    Favorite.update({ cn: req.params.name }, 
   //       { "$pull": { "favorites": { "_id": favoriteId } }}, 
   //       { safe: true, multi:true }, function(err, obj) {
   //       //do something smart
   //   }) 
   
   // doc.subdocs.pull({ _id: 4815162342 })
      console.log('asd')
      return res.json(book);
   }
   catch (err) {

      res.status(500).send(err);

   }
})

// router.delete('/',async(req,res)=>{
//    try{
//      const book= await bookModel.deleteMany({});
//     return res.json(book);
//  }
//  catch(err){
//     res.status(500).send(err);
//  }
// })

router.delete('/:id', async (req, res) => {
   try {
      await bookUserModel.deleteMany({ book: req.params.id });
      await reviewModel.deleteMany({ book: req.params.id });

      const bookPhoto = await bookModel.find({_id:req.params.id},{img:1});
      fs.unlink(bookPhoto[0].img, (err) => {
        if (err) throw err;
        console.log('File deleted!');
      });

      const book = await bookModel.deleteOne({ _id: req.params.id });
      return res.json(book);
   }
   catch (err) {
      res.status(500).send(err);
   }
})


module.exports = router;



