//framework to work with APIs 
const express = require('express');
const router = express.Router()
const CategoryModel = require('../model/Category/Category');


const bookModel = require('../model/books/book');

const auth = require ('../middlewares/auth')

const {authAdmin} = require ('../middlewares/auth');




router.get('/page/:page',async (req ,res)=>{
    
    try {
        const page=req.params.page;
        const limit=5;

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



router.get('/:id/page/:page',async (req ,res)=>{//get All book and all authror ref this category 
   try {
    //    const book = await bookModel.find({id: req.params.id});
         

         // const book= await bookModel.find({}).populate({path:'category',model:'category', match:{_id:req.params.id} })
         // return res.json(book)  

const idCategory=req.params.id;
const categoryID=await CategoryModel.find({_id:idCategory});

const catBooks=await bookModel.find({'category':idCategory});
return res.json(catBooks);
   } catch (err) {
    res.status(500).send(err);
   }
})

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
module.exports = router ; 