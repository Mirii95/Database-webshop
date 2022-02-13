const express = require('express');
const database = require('../database/connection.js')
const router = express.Router();


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
 *   Category:
 *    type: object
 *    required:
 *     - id
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de authentication.
 */

/**
 * @swagger
 * /api/authentication:
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
    const login = req.body.name;
    
    if (!req.userTemp){
        res.status(403).json({ message: "You are not authorised to post!"});
        return;
      }

    db.run("INSERT INTO authentication (id) VALUES (0);");
  
    res.status(200).json({ message: "ok"});
    db.close();
});

/**
 * @swagger
 * /api/authentication:
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
    const login = req.body.name;

    db.run("INSERT INTO authentication (id) VALUES (0);");
  
    res.status(200).json({ message: "ok"});
    db.close();
});