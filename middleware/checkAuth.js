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
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
  
    // if (token == null) return res.sendStatus(401);
  
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //   console.log(err);
  
    //   if (err) return res.sendStatus(403);
  
    //   req.user = user;
  
    //   next()
    // });
};


// let DateTester = function (req, res, next) {
//     console.log('Time:', Date.now());
//     next();
// };

module.exports.TimeTester = TimeTester;
// module.exports.DateTester = DateTester;
module.exports.AuthTest = AuthTest;