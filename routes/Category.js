//framework to work with APIs 
const express = require('express');
const router = express.Router();
require('dotenv').config();
const fs = require('fs');
const CategoryModel = require('../model/Category/Category');
const BookModel=require('../model/books/book');
const {storageCategory}=require("../middlewares/upload");
const {authAdmin} = require ('../middlewares/auth');




router.get('/page/:page',async (req ,res)=>{
    
    try {
        const page=req.params.page;
        const limit=process.env.limit;

        //عدد الكاتيجوري اللي عاوزاه تظهر
        const countCategory=await CategoryModel.find({}).count();
        //بعد عدد الكاتيجوري
        const totalPages=Math.ceil(countCategory/limit);
        //عدد الصفحات
        
        const Categories =   await CategoryModel.find({})
        .limit(limit)
        .skip((page-1)*limit)
        .exec();

      const objCategories=
      {
         pages:
         {
            totalPages,
            page
         },
         data:Categories
      };
       return res.json(objCategories);
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get('/search/:search',async(req,res)=>{
   try{
   const query = req.params.search;
   
   const category = await CategoryModel.find({ name: { $regex: query, $options: 'i' }})
      .sort({ name:1 }) // sort by last name and then first name
      .limit(10); // limit to 10 results
      return res.json(category);
   }  
   catch(err){
       res.status(500).send(err);
   }
})//get



router.get('/:id/:userId',async(req,res)=>{



 
//    const id=req.params.id;
//    const userId=req.params.userId;  

//    try{
//   const category = await CategoryModel.find({_id:id},{}) 
//   .populate({path:'books',model:'book',select: {'name':1,'avg_rate':1,'img':1,"_id":1,'bookUser':1,'category':1}

//   ,populate:{path:'bookUser',model:'bookUser',
//   select:{rating:1,status:1,user:1},match:{user:userId}}   

// })
 
//      let bookCategory =[];
//      for (i=0;i<category[0].books.length;i++){
//         try {
//            let userRating = null;let userStatus=null;

//            if (category[0].books[i].bookUser?.length > 0) {
//               for(j=0;j<category[0].books[i].bookUser?.length;j++){
//                  if(userId==category[0].books[i].bookUser[j].user){
//                     userRating = category[0].books[i].bookUser[j].rating;
//                     userStatus = category[0].books[i].bookUser[j].status;
//                  }
//               }
//            }  
          
//            const book = {                 
//             category: {
//                name: category[0].name,
//             },
             
//               name: category[0].books[i].name,
//               img: category[0].books[i].img,
//               avg_rate: category[0].books[i].avg_rate,
              
//            };

//            bookCategory[i] = {
//               rating: userRating || 1,
//               status: userStatus || 'wantToRead',
//               book: book
//            }; 
           
//         } catch (error) {
//            console.log(error);
//         }
//      }
      
//   const result = {_id:category[0]._id, name:category[0].name, img:category[0].img
//                  ,books:bookCategory}
//   return res.send(result);

//   }
//   catch(err){
//      res.status(500).send(err);
//   } 
// })  


   const id=req.params.id;
   const userId=req.params.userId;  

   try{
  const category = await CategoryModel.find({_id:id},{}) 
  .populate({path:'books',model:'book',select: {'name':1,'avg_rate':1,'img':1,"_id":1,'bookUser':1,'category':1}

  ,populate:{path:'bookUser',model:'bookUser',
  select:{rating:1,status:1,user:1},match:{user:userId}}   

})
 
     let bookCategory =[];
     for (i=0;i<category[0].books.length;i++){
        try {
           let userRating = null;let userStatus=null;

           if (category[0].books[i].bookUser?.length > 0) {
              for(j=0;j<category[0].books[i].bookUser?.length;j++){
                 if(userId==category[0].books[i].bookUser[j].user){
                    userRating = category[0].books[i].bookUser[j].rating;
                    userStatus = category[0].books[i].bookUser[j].status;
                 }
              }
           }  
          
           const book = {                 
            category: {
               name: category[0].name,
            },
             
              name: category[0].books[i].name,
              img: category[0].books[i].img,
              avg_rate: category[0].books[i].avg_rate,
              
           };

           bookCategory[i] = {
              rating: userRating || 1,
              status: userStatus || 'wantToRead',
              book: book
           }; 
           
        } catch (error) {
           console.log(error);
        }
     }
      
  const result = {_id:category[0]._id, name:category[0].name, img:category[0].img
                 ,books:bookCategory}
  return res.send(result);

  }
  catch(err){
     res.status(500).send(err);
  } 
})  


router.get('/:id/:userId',async(req,res)=>{

   const id=req.params.id;
   const userId=req.params.userId;  

   try{
  const category = await CategoryModel.find({_id:id},{}) 
  .populate({path:'books',model:'book',select: {'name':1,'avg_rate':1,'img':1,"_id":1,'bookUser':1,'category':1}

  ,populate:{path:'bookUser',model:'bookUser',
  select:{rating:1,status:1,user:1},match:{user:userId}}   

})
 
     let bookCategory =[];
     for (i=0;i<category[0].books.length;i++){
        try {
           let userRating = null;let userStatus=null;

           if (category[0].books[i].bookUser?.length > 0) {
              for(j=0;j<category[0].books[i].bookUser?.length;j++){
                 if(userId==category[0].books[i].bookUser[j].user){
                    userRating = category[0].books[i].bookUser[j].rating;
                    userStatus = category[0].books[i].bookUser[j].status;
                 }
              }
           }  
          
           const book = {                 
            category: {
               name: category[0].name,
            },
             
              name: category[0].books[i].name,
              img: category[0].books[i].img,
              avg_rate: category[0].books[i].avg_rate,
              
           };

           bookCategory[i] = {
              rating: userRating || 1,
              status: userStatus || 'wantToRead',
              book: book
           }; 
           
        } catch (error) {
           console.log(error);
        }
     }
      
  const result = {_id:category[0]._id, name:category[0].name, img:category[0].img
                 ,books:bookCategory}
  return res.send(result);

  }
  catch(err){
     res.status(500).send(err);
  } 
})  

router.post('/',[authAdmin,storageCategory],async(req,res) =>{ 
    
    try {
      const objCategory = {
         name: req.body.name,
         img: req.file.path
      };
 
       const category = await CategoryModel.create(objCategory);
      //  await category.save();  
       return res.json(category);
    } catch (error) {
        return res.status(500).send(error);
}
})
 
//params==>url(data)
router.put('/:id',[authAdmin,storageCategory],async (req,res)=>{
    try{

      const id=req.params.id;
      const oldCategory = await CategoryModel.findOne({_id:id},{img:1,name:1});
      
      const objCategory = {};
      if(oldCategory.name!=req.body.name){
         objCategory.name= req.body.name;
      }
      
        if(req.file)
        {
         fs.unlink(oldCategory.img, (err) => {
           if (err) throw err;
           console.log('File deleted!');
         });
         objCategory.img=req.file.path;
      }
      const category = await CategoryModel.updateOne({_id:id},objCategory);
     return res.json(category);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

router.delete('/:id',async(req,res)=>{
  
    try{
      const id=req.params.id;
       await BookModel.deleteMany({category: req.params.id});
       const categoryPhoto = await CategoryModel.find({_id:id},{img:1});
       fs.unlink(categoryPhoto[0].img, (err) => {
         if (err) throw err;
         console.log('File deleted!');
       });
      
       const category= await CategoryModel.findByIdAndDelete({_id:id});
     return res.json(category);
       }
  catch(err){
     res.status(500).send(err);
  }
})






 router.delete('/',async(req,res)=>{
   try{
   const category= await CategoryModel.deleteMany({});
      BookModel.deleteMany({},{});
       
    return res.json(author);
 }
 catch(err){
    res.status(500).send(err);
 }
})//delete all 

 


router.get('/',async (req ,res)=>{ 
   try {
       const category = await CategoryModel.find({});
         return res.json(category)  
   } catch (err) {
    res.status(500).send(err)
   }
});



module.exports = router ; 