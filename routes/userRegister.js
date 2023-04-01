const express = require('express');
const router = express.Router()
const userModel = require ('../model/auth/user/user')
const bcrypt = require("bcrypt")
const { storageUser } = require('../middlewares/upload');
const jwt = require('jsonwebtoken');
const TOKEN_KEY=process.env.TOKEN_KEY || "ITI"
// const  emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

router.post("/",storageUser,async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const errResEmail={message:'User Already Exist. Please Login'}
      const { first_name, last_name, email, password,confirmPassword,img ,isAdmin} = req.body;
      // Validate user input
      if (!(email && password && confirmPassword && first_name && last_name)) {
        return res.status(400).send("All input is required except image");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await userModel.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send(errResEmail);
      }
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      encryptedConfirmPassword = await bcrypt.hash(confirmPassword,10)

    
      // Create user in our database
      const objUser=
      {
        first_name,
        last_name,
        email:email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword,
        isAdmin,
      };
      if(req.file)
      {
        objUser.img=req.file.path;
      }
      const user = await userModel.create(objUser);
      // Create token
      const token =jwt.sign(
        {user},
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      // const response={message:'success',token:user.token}

      // return new user
      res.status(201).json(user);
    } catch (err) {
     return res.status(500).send(err);
    }
    // Our register logic ends here
  });

  module.exports = router ; 



           // check password pattern
        //  if (password !=  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/) {
        //   return res.status(409).send("password not valid");
        // }

      // if (email != emailFormat) {
      //     return res.status(409).send("email not valid");
      //     }



            // if(encryptedConfirmPassword !== encryptedPassword) {
      //   return res.status(403).send("Not Match Password"); 
      // }