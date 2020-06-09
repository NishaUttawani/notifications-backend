	
// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
 
// generate token and return it
function generateToken(user) {
  if (!user) return null;
 
  var u = {
    email: user.email,
    name: user.name,
  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// return basic user details
function getCleanUser(user) {
    if (!user) return null;
   
    return {
      email: user.email,
      name: user.name
    };
  }

module.exports = {
    generateToken,
    getCleanUser
  }