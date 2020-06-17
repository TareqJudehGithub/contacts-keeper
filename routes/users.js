const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check, validationResult } = require('express-validator');


const User = require("../models/User");


// @route      POST      api/users
// @desc       Register a user
// @access     Public
router.post("/", [
     
     check("name", "Please enter a valid name.")
          .not()      // not validation
          .isEmpty(), // empty validation

     check("email", "Please enter a valid email address.")
          .isEmail(),

     check("password", "Please enter a valid username/password.")
          .isLength({ min: 6 })
     ],
     async (req, res) => {
          const errors =validationResult(req);
          if(!errors.isEmpty()) { 
               return res.status(400).json({ errorrs: errors.array() });
          }
          const { name, email, password } = req.body;
          try {
               let user = await User.findOne({ email: email });

               if(user) { // if User email already exists
                    return res.status(400).json({ msg: "User already exists" });
               }
               user = new User({ //create a new user
                  name: name,
                  email: email,
                  password: password
               });
               
               // hashing the password
               const salt = await bcrypt.genSalt(10);
               user.password = await bcrypt.hash(password, salt);

               await user.save(); // saving user in MongoDB

               res.status(200).json("User successfully saved!");
          } 
          catch (error) {
               console.log(error.message);
               res.status(500).send("Error creating new user!");
          };
});

module.exports = router;
