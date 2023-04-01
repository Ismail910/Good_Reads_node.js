const multer=require('multer');

   const author=  multer.diskStorage({
    destination:function(req,file,callbackFunc)
    {
       callbackFunc(null,'./assets/authors')
    },filename:function(req,file,callbackFunc)
    {
       var nameImage=new Date().toISOString().replace(/:/g,'-') +file.originalname;
       callbackFunc(null,nameImage)
    }
   });


   
const book=multer.diskStorage({
    destination:function(req,file,callbackFunc)
    {
       callbackFunc(null,'./assets/books')
    },filename:function(req,file,callbackFunc)
    {
       var nameImage=new Date().toISOString().replace(/:/g,'-') + file.originalname;
       callbackFunc(null,nameImage)
    }
 });



 const category=multer.diskStorage({
   destination:function(req,file,callbackFunc)
   {
      callbackFunc(null,'./assets/categories')
   },filename:function(req,file,callbackFunc)
   {
      var nameImage=new Date().toISOString().replace(/:/g,'-') + file.originalname;
      callbackFunc(null,nameImage)
   }
});
const user=multer.diskStorage({
   destination:function(req,file,callbackFunc)
   {
      callbackFunc(null,'./assets/users')
   },filename:function(req,file,callbackFunc)
   {
      var nameImage=new Date().toISOString().replace(/:/g,'-') + file.originalname;
      callbackFunc(null,nameImage)
   }
});


 exports.storageAuthor= multer({storage:author}).single('photo');
 exports.storageBook=multer({storage:book}).single('img');
 exports.storageCategory=multer({storage:category}).single('img');
 exports.storageUser=multer({storage:user}).single('img');