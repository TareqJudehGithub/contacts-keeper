const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = function(req, res, next) {
     
     // get token from header
     const token = req.header("x-auth-token");

     // check if token does not exist in the header
     if(!token) {
          return res.status(401).json({ msg: "No token, authorization denied" });
     }
     // if there's a token
     try {
          // verify the token  (token, secret)
          const decoded = jwt.verify(token, config.get("jwtSecret"));       
          
          //set the user inside the payload, to req.user
          req.user = decoded.user;
          next(); 
     } 
     catch (error) { // if token is not verified
          res.status(401).json({ msg: "Token is not valid!"});
     }
   
}