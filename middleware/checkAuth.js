var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

let TimeTester = function (req, res, next) {
    console.log('Time:', Date.now());
    next();
};

let AuthTest = function (req, res, next) {
    req.userAdmin = true;
    req.userTemp = true;
    next();
};

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      console.log(err);
  
      if (err) return res.sendStatus(403);
  
      req.user = user;
  
      next();
    })
  }

module.exports.generateAccessToken = function generateAccessToken(username) {
    return jwt.sign(username, process.env.SECRET_TOKEN, { expiresIn: '1800s' });
}

// let DateTester = function (req, res, next) {
//     console.log('Time:', Date.now());
//     next();
// };

module.exports.TimeTester = TimeTester;
// module.exports.DateTester = DateTester;
module.exports.AuthTest = AuthTest; 
// module.exports.authenticateToken = authenticateToken; 