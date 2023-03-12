const express=require('express');
const bookModel = require('../model/books/book');
const authorModel = require('../model/author/author');
const router = express.Router();
const popularBooks=[];
router.get('/popularBook', async (req, res)=>{
    try{
        const popularBook = await bookModel.find({},{'name':1, 'img':1,'summary':1,'avg_rate':1,"category":1})
        .sort({avg_rate: -1}).limit(5)
        .populate({path:'category', select: {'name':1, _id:0}});
        console.log(popularBook);
        popularBooks=popularBook;
        return res.json(popularBook);
    }catch(err){
        res.status(500).send(err);
    }
})

///////////////// popular author   aggregate([{$group: {_id:"$book", avg_val:{$avg:"$rating"}}}]);

router.get('/popularAuthor', async (req,res)=>{
    try{
        const popularBook = await bookModel.find({},{'name':1, 'img':1,'summary':1,'avg_rate':1,"category":1,"author":1})
        .sort({avg_rate: -1}).limit(5)
        .populate({path:'category', select: {'name':1, _id:0}});

        console.log(popularBook);
        // const unsortAuthorPopular =[5][2];
        
        // popularBook.forEach(ele =>{
               
        //         let find=0;
               
                
        //         for (let i of unsortAuthorPopular) {
        //             if(i[0]==ele.author){
        //                 i[1]++;
        //                 find=1;
        //                 break;
        //             }                
        //         }
        //         console.log(ele);
                
        //         if(find==0){
        //             unsortAuthorPopular[unsortAuthorPopular.length][0]=ele.author;
        //             unsortAuthorPopular[unsortAuthorPopular.length][1] +=1;
        //         }  
        // })
        
        // unsortAuthorPopular.sort (
        //     function (a, b) {
        //         if (a[1] === b[1]) {
        //             return 0;
        //         } else {
        //             return (a[c] < b[c]) ? -1 : 1;
        //         }
        //     }
        // );


        // const sortAuthor=
        // await popularBook.forEach(async (ele )=>{
        //     await authorModel.find({_id:ele.author},{})

             
            
        // })
        // console.log(sortAuthor);

      
        return res.json({"sortAuthor":"jjj"});
    }catch(err){
        res.status(500).send(err);
       }
    }
)
module.exports = router; 

