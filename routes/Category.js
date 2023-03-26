//framework to work with APIs 
const express = require('express');
const router = express.Router();
require('dotenv').config();
const CategoryModel = require('../model/Category/Category');
const BookModel=require('../model/books/book');
const bookModel = require('../model/books/book');
const auth = require ('../middlewares/auth')
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



router.get('/:id/userId',async (req ,res)=>{//get All book and all authror ref this category 
   try {
   /* const page=req.params.page;
    const limit=5;
    const countCategory=await BookModel.find({'category':idCategory}).count();
    const totalPages=Math.ceil(countCategory/limit);
  */

    const idCategory=req.params.id;
    const userId =req.params.userId; 
    const books = await BookModel.find({'category':idCategory}).populate({path:'books',model:'book',select: {'name':1,img:1,'avg_rate':1,"_id":0},populate:{path:'bookUser',model:'bookUser',
    select:{rating:1,status:1},match:{user:userId}}});
    
       /*.limit(limit)
       .skip((page-1)*limit)
       .exec();*/

     /*const objBooks=
     {
        pages:
        {
           totalPages,
           page
        },
        data:books
     };*/
      return res.json(books);
   } catch (err) {
    res.status(500).send(err)
   }
});

//body is json(name=......?)
router.post('/',authAdmin,async(req,res) =>{ 
    
    try {
       const category = await CategoryModel.create(req.body);
       console.log(category);
      //  await category.save();  
       return res.json(category);
    } catch (error) {
        return res.status(500).send(error);
}
})


//params==>url(data)
router.put('/:id',authAdmin,async (req,res)=>{
    const id=req.params.id;
//{$set:req.body}
    try{
        const category = await CategoryModel.findByIdAndUpdate(id, req.body);
     return res.json(category);
  }
  catch(err){
     res.status(500).send(err);
  } 
})

router.delete('/:id',authAdmin,async(req,res)=>{
    const id=req.params.id;
    try{
        await bookModel.deleteMany({category: req.params.id});
    const category= await CategoryModel.findByIdAndDelete({_id:id});
     return res.json(category);
       }
  catch(err){
     res.status(500).send(err);
  }
})


router.get('/',async (req ,res)=>{ 
    try {
        const category = await CategoryModel.find({});
          return res.json(category)  
    } catch (err) {
     res.status(500).send(err)
    }
 });


module.exports = router ;