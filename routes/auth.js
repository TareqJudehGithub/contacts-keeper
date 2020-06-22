const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");


// @route      GET  api/auth
// @desc       GET  logged in user
// @access     Private

router.get("/", (req, res) => {
     res.send("Get logged in user");
});

// @Route      POST api/auth
// @desc       Auth user & get token
// @acess      Public
router.post("/", 
     [
          check("email", "Email must not be empty!")
               .isEmail(),
          check("password", "Password must not be empty!")
               .exists()
     ],
     async (req, res) => {
          const errors = validationResult(req);
          if(!errors.isEmpty()){
               return res.status(400).json({ errors: errors.array() });
          }
     const { email, password } = req.body;

     try {
          let user = await User.findOne({ email: email });
          if(!user){  // if user does not exist
               res.status(400).json({ msg: "User does not exist!"});
          }
          // check password using bcyptjs, by comparing (plain, hashed) pass
          const isMatch = await bcrypt.compare(password, user.password) 
          if(!isMatch) {
               return res.status(400).json({ msg: "Invalid username or password!"});
          }
          const payload = {
               user: {
                     id: user.id   // from the user in the db  (User.findOne() )
               }
          };

          jwt.sign(
               payload,
               config.get("jwtSecret"),
               {
                    expiresIn: 3600
               },
               (err, token) => {
                    if(err) throw err;
                    res.json({ token })
               }
          )

     } catch (error) {
          console.log(error.message);
          res.status(500).json("Server Error! Error authenticating user!");
     }
})

module.exports = router;