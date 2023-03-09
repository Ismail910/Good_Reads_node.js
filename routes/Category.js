//framework to work with APIs 
const express = require('express');
const router = express.Router()

const CategoryModel = require('../model/Category/Category');
const auth = require ('../middlewares/auth')



router.get('/page/:page',async (req ,res)=>{
    
    try {
        const page=req.params.page;
        const limit=5;
        const countCategory=await CategoryModel.find({}).count();
        const totalPages=Math.ceil(countCategory/limit);
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



router.get('/:id',async (req ,res)=>{//get All book and all authror ref this category 
   try {
       const category = await CategoryModel.find({_id: req.params.id});
         return res.json(category)  
   } catch (err) {
    res.status(500).send(err)
   }
})

//body is json(name=......?)
router.post('/',auth,async(req,res) =>{ 
    
    try {
       const category = await CategoryModel.create(req.body);
       console.log(category);
       await category.save();
       return res.json(category);
      
    } catch (error) {
     
        return res.status(500).send(error);
}
})


//params==>url(data)
router.put('/:id',auth,async (req,res)=>{
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


router.delete('/:id',auth,async(req,res)=>{
    const id=req.params.id;
    try{
    const category= await CategoryModel.deleteOne({_id:id});
     return res.json(category);
  }
  catch(err){
     res.status(500).send(err);
  }
})

module.exports = router ; 