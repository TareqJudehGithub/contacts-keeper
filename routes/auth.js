const express = require("express");
const router = express.Router();

// @route      GET  api/auth
// @desc       GET  logged in user
// @access     Private

router.get("/", (req, res) => {
     res.send("Get logged in user");
});

// @Route      POST api/auth
// @desc       Auth user & get token
// @acess      Public
router.post("/", (req, res) => {
     res.send("login in a user ")
})

module.exports = router;