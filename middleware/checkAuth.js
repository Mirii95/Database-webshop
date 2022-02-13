var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

let TimeTester = function (req, res, next) {
    console.log('Time:', Date.now());
    next();
};

// let DateTester = function (req, res, next) {
//     console.log('Time:', Date.now());
//     next();
// };

module.exports.TimeTester = TimeTester;
// module.exports.DateTester = DateTester;