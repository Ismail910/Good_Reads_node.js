//framework to work with APIs 
const express = require('express');
const router = express.Router()

const CategoryModel = require('../model/Category/Category');




router.get('/',async (req ,res)=>{

    try {
      const Categories =   await CategoryModel.find({}) ;
      
      return res.json(Categories);
    } catch (err) {
        res.status(500).send(err)
    }
})



router.get('/:id',async (req ,res)=>{
   try {
       const category = await CategoryModel.find({_id: req.params.id});
         return res.json(category)
   } catch (err) {
    res.status(500).send(err)
   }
})

//body is json(name=......?)
router.post('/',async(req,res) =>{ 
    
    try {
       const category = await CategoryModel.create(req.body);
       console.log(category);
       await category.save();
       return res.status(200).json(category);
      
    } catch (error) {
     
        return res.status(500).send(error);
}
})


//params==>url(data)
router.put('/:id',async (req,res)=>{
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


router.delete('/:id',async(req,res)=>{
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