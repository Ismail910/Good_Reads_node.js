// const jwt = require("jsonwebtoken");
// const userModel = require('../model/auth/user/user')

// const config = process.env;

// const verifyToken = async(req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token,config.TOKEN_KEY);
//     req.user = decoded;
//     const user = await userModel.findOne({
//       token:token
//     })
//     req.user = user
//     return next();
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }

// };

// module.exports = verifyToken;
const jwt = require ('jsonwebtoken');
const { model } = require('mongoose');
const TOKEN_KEY = "ITI"

const auth = function (req,res,next){
     const token = req.headers["x-token"]; 

     if(!token) 
     {
        return res.status(403).send("A token is required for authentication");
     }
     try{
        const decoded = jwt.verify(token,TOKEN_KEY) 
        req.user = decoded;                        
      }
     catch(err)
     {
         return res.status(401).send("invalid Token");   
     }
     return next();  
}

module.exports = auth;  