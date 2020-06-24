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
router.post("/", 
     [
          auth, 
          [
               check("name", "Name is required")
                    .not()
                    .isEmpty(),
               check("email", "Please enter a valid Email address.")
                    .isEmail()
          ]
     ],
     async (req, res) => {
          const errors = validationResult(req);
          if(!errors.isEmpty()){
               res.status(400).json({ errors: errors.array() });
          }
          const { name, email, phone, type } = req.body;

          try {
               let newContact = await Contact.findOne({ email: email});
               if(newContact){
                    res.status(400).json("Error! Contact already exists!");
                    return;
               }
               newContact = new Contact({
                    name: name,
                    email: email,
                    phone: phone,
                    type: type,
                    user: req.user.id  
               })
               const contact = await newContact.save();  
               res.json(contact)
          } 
          catch (error) {
               console.log(error.message);
               res.status(500).json("Server Error! POST /api/contacts");
          }
     });


// @route      PUT api/contacts/:id
// @desc       Update a contact
// @access     Private
router.put("/:id", auth, async(req, res) => {
     const { name, email, phone, type} = req.body;

     // Build contact object
     const contactFields = {}; 

     if(name) contactFields.name = name;  
     if(email) contactFields.email = email;
     if(phone) contactFields.phone = phone;
     if(type) contactFields.type = type;

     try {
          let contact = await Contact.findById(req.params.id);
          if(!contact){
               return res.status(404).json({msg: "Contact not found."});
          }
          //make sure user's own contact
          if(contact.user.toString() !== req.user.id){
               return res.status(401).json({ msg: "Not authorized!"});
          }
          contact = await Contact
               .findByIdAndUpdate(
                    req.params.id, 
                    {$set: contactFields },
                    {new: true} 
               );
               res.json(contact);
     }              
      catch (error) {
          console.log(error.message);
          res.status(500).json("Server Error! PUT /api/contacts");
     }
});

// @route      Delete api/contacts/:id
// @desc       Delete a contact
// @access     Private
router.delete("/:id", auth, async (req, res) => {
          const { name } = req.body;
     try {
          let contact = await Contact.findById(req.params.id);
          if(!contact){
               return res.status(404).json({ msg: "Error! Contact not found!"});
          }
          if(contact.user.toString() !== req.user.id){
               return res.status(401).json({ msg: "Action not authorized!"});
          }
          await Contact.findByIdAndRemove(req.params.id);
          res.json({ msg: `Contact ${contact.name} was successfully removed!`});

     }
      catch (error) {
          
     }
});


module.exports = router;