const express=require('express');
const bookModel = require('../model/books/book');
const authorModel = require('../model/author/author');
const router = express.Router();
const popularBook=[];
router.get('/popularB', async (req, res)=>{
    try{
         popularBook = await bookModel.find({},{'name':1, 'img':1,'summary':1,'avg_rate':1})
        .sort({avg_rate: -1}).limit(5)
        .populate({path:'category', select: {'name':1, _id:0}});
        console.log(popularBook);
        return res.json(popularBook);
    }catch(err){
        res.status(500).send(err);
    }
})

///////////////// popular author   aggregate([{$group: {_id:"$book", avg_val:{$avg:"$rating"}}}]);

router.get('/popularA', async (req,res)=>{
    try{

        // popularBook.forEach((ele )=>{
        //    const sortAuthor = authorModel.find({_id:ele.author },{'firstName':1,'lastName':1,'photo':1});
        //     console.log( sortAuthor );
        //    return res.json(sortAuthor); 

        
        const unsortAuthorPopular =[][5];
        popularBook.forEach(ele =>{
                const i=[];
                let find=0;
                for (i of unsortAuthorPopular) {
                    if(i[0]==ele.author){
                        i[1]++;
                        find=1;
                        break;
                    }
                }
                if(find==0){
                    unsortAuthorPopular[unsortAuthorPopular.length][0]=ele.author;
                    unsortAuthorPopular[unsortAuthorPopular.length][1]=1;
                }   

        })
        unsortAuthorPopular.sort (
            function (a, b) {
                if (a[1] === b[1]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
        
        // popularBook.forEach((ele )=>{
        //    const sortAuthor = authorModel.find({_id:ele.author},{'firstName':1,'lastName':1,'photo':1});
        //     console.log( sortAuthor );
        //    return res.json(sortAuthor); 
        // })
    }catch(err){
        res.status(500).send(err);
       }
    }
)
module.exports = router; 

