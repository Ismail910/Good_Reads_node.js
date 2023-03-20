const multer=require('multer');
const path=require('path');

   const author=  multer.diskStorage({
    destination:function(req,file,callbackFunc)
    {
       callbackFunc(null,path.join(__dirname,'../assets/authors'))
    },filename:function(req,file,callbackFunc)
    {
       var nameImage=new Date().toISOString().replace(/:/g,'-') +file.originalname;
       callbackFunc(null,nameImage)
    }
   });


const book=multer.diskStorage({
    destination:function(req,file,callbackFunc)
    {
       callbackFunc(null,path.join(__dirname,'../assets/books'))
    },filename:function(req,file,callbackFunc)
    {
       var nameImage=new Date().toISOString().replace(/:/g,'-') + file.originalname;
       callbackFunc(null,nameImage)
    }
 });

 exports.storageAuthor= multer({storage:author}).single('photo');
 exports.storageBook=multer({storage:book}).single('img');
