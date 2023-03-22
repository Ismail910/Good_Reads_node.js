
const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt")
// const env = require('dotenv');
const jwt = require('jsonwebtoken');

const userModel = require ('../model/auth/user/user');
const TOKEN_KEY =process.env.TOKEN_KEY || "ITI"
router.post("/", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
       return res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await userModel.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token =  jwt.sign(
          {user},
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
        // user   
        // const response={message:'success',token:user.token}
       return res.status(200).json(user);
      }
      const errResponse = {message:'passwoer or email is invalid'}
      return res.status(400).send(errResponse);
    } catch (err) {
<<<<<<< HEAD
    //  res.status(500).send(err);  
       console.log(err);
=======
      return res.status(500).send(err);
>>>>>>> 0f75ea10b26b914247829ebb4b1b8d6792f2857c
    }
  });

    module.exports = router ; 