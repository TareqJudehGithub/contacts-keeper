const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const auth = require("../middleware/auth");

// @route      GET      api/users
// @desc       get all users
// @access     Public
router.get("/", async(req, res) => {

     const users = await User.find().sort({ date: -1});
     res.json(users);
})

// @route      POST      api/users
// @desc       Register a user
// @access     Public
router.post("/", [
     
     check("name", "Please enter a valid name.")
          .not()      // the not empty validation
          .isEmpty(), 

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
               //create a new user
               user = new User({ 
                  name: name,
                  email: email,
                  password: password
               });
               
               // hashing the password
               const salt = await bcrypt.genSalt(10);
               user.password = await bcrypt.hash(password, salt);

               await user.save(); // saving user in MongoDB

              // JWT payload
               const payload = {
                    user: {
                         id: user.id
                    }
               }
               // generating a token
               jwt.sign(
                    payload, 
                    config.get("jwtSecret"),
                    {
                         expiresIn: 360000   // token expiry
                    },
                    (err, token) => {
                         if(err) throw err;
                         res.json({ token });
                    });
          } 
          catch (error) {
               console.error(error.message);
               res.status(500).json("ServerError! Error creating new user!");
          };
});

// @route      PUT      api/users/:id
// @desc       Edit a user
// @access     Private
router.put("/:id", auth, async(req, res) => {
     const { name, email, password } = req.body;
    
     // Build user object:
     const userFields = {};

     if(name) userFields.name = name;
     if(email) userFields.email = email;
     if(password) userFields.password = password;

     try {
          let user = await User.findById(req.params.id);
          if(!user){
               return res.status(404).json({ msg: "Error 404! User not found!"});               
          }
          if(user.id !== req.user.id){
               return res.status(401).json({ msg: "This action is not authorized!" });               
          }
          user = await User
               .findByIdAndUpdate(
                    req.params.id,
                    {$set: userFields},
                    {new: true}
               )
               res.json(user);

     } catch (error) {
          console.log(error.message);
          res.status(500).json("Server Error 500! Edit user failed!");
     }
});





// @route      POST      api/users/:id
// @desc       Delete a user
// @access     Private
router.delete("/:id", auth, async(req, res) => {
     const { name } = req.body;
     try {
          let user = await User.findById(req.params.id);

          if(!user){
               return res.status(404).json({ msg: "Error! User not found!"});
          }
          if(user.id === req.user.id){
               res.status(401).json({ msg: "Error 401! User Cannot delete his/her own account!"});
               return;
          }
          await User.findByIdAndRemove(req.params.id);
          res.json({msg: `User was successfully deleted!`});
     } 
     catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Delete user failed!"});
     }
})


module.exports = router;
