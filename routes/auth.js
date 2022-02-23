const express = require('express');
const database = require('../database/connection.js')
const CheckAuth = require('../middleware/checkAuth.js');
const router = express.Router();







const jwt = require('jsonwebtoken'); 
// const token = jwt.sign(
//     {user_id: row.id},
//     process.env.SECRET
// );
    
// jwt.verify(
//     token, 
//     process.env.SECRET,
//     function (err, decoded) {
//         let user_id = decoded.user_id;
//     }
// );
    









// • POST api/auth (token) • body: username of user_id
// Middleware
// • Toepassen op alle U en A in de rekenhulp
// Voeg een nieuw product toe

// • POST http://localhost:8000/api/products
// In de header
// • Content-Type: application/json
// • Authorization: Bearer TokenString64bits

/**
 * @swagger
 * components:
 *  schemas:
 *   authentication:
 *    type: object
 *    required:
 *     - username
 *     - password
 *    properties:
 *     username: 
 *      type: string
 *      description: De id van de authentication.
 *     password:
 *      type: string
 *      description: De id van de authentication.
 */

/**
 * @swagger
 * /api/auth:
 *  post:
 *   tags: [authentication]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/authentication'
 *        
 *   responses:
 *    200:
 *     description: Json met de authentication.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/authentication'
 */

router.post("/", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // const username = "windesheim@gmail.nl";
    // const password = "test1234";
    const token = jwt.sign(
        {user_id: username},
        process.env.SECRET
    );
        
    // jwt.verify(
    //     token, 
    //     process.env.SECRET,
    //     function (err, decoded) {
    //         let user_id = decoded.user_id;
    //     }
    // );

    // res.status(200).json({ message: "Foute gegevens"});
    res.status(200).json({ message: "Foute gegevens", password: password, username: username, token: token});

    // db.run("INSERT INTO authentication (id) VALUES (0);");
    // req.headers['authorization'] = "";
    // req.headers['authorization'] = CheckAuth.generateAccessToken({ username: req.body.name });
    // req.headers['authorization'] = CheckAuth.generateAccessToken({ username: "Tessa" });
    // res.status(200).json({ message: "ok"});

    // db.close();
});

module.exports = router;

// {
//     "message": "Foute gegevens",
//     "password": "strings",
//     "username": "string",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3RyaW5nIiwiaWF0IjoxNjQ1MzkxMjMyfQ.jtYoZXzKHjjgOVQsi4Lbwl1W6pbQyNXHfCCpZXTf0jI"
//   }