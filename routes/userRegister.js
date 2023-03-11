const express = require('express');
const router = express.Router()
const userModel = require ('../model/auth/user/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const TOKEN_KEY =process.env.TOKEN_KEY || "ITI"
// const  emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

router.post("/", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password,confirmPassword,img } = req.body;
  
      // Validate user input
      if (!(email && password && confirmPassword && first_name && last_name)) {
        res.status(400).send("All input is required except image");
      }
         // check password pattern
        //  if (password !=  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/) {
        //   return res.status(409).send("password not valid");
        // }

      // if (email != emailFormat) {
      //     return res.status(409).send("email not valid");
      //     }
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await userModel.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      encryptedConfirmPassword = await bcrypt.hash(confirmPassword,10)

      // if(encryptedConfirmPassword !== encryptedPassword) {
      //   return res.status(403).send("Not Match Password"); 
      // }
      // Create user in our database
      const user = await userModel.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword,
        img
      });
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
        
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  module.exports = router ; 