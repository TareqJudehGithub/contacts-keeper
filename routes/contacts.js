const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route      GET api/contacts
// @desc       Get all users contacts
// @access     Private
router.get("/", auth, async (req, res) => {
     
     try {
          // auth middleware grants access to req.user.id
          const contacts = await Contact
               .find({ user: req.user.id })
               .sort({ date: -1}) 
               res.json(contacts);
     } 
     catch (error) {
          res.status(500).json("Server Error! GET /api/contacts")
     }
});


// @route      POST api/contacts
// @desc       Add new contact
// @access     Private
router.post("/", (req, res) => {
     res.send("add contact");
});

// @route      PUT api/contacts/:id
// @desc       Update a contact
// @access     Private
router.put("/:id", (req, res) => {
     res.send("Update contact");
});

// @route      Delete api/contacts/:id
// @desc       Delete a contact
// @access     Private
router.delete("/:id", (req, res) => {
     res.send("Delete contact");
});


module.exports = router;