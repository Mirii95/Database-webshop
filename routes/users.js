const express = require('express');
const database = require('../database/database.js')
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Users:
 *    type: object
 *    required:
 *     - users_id
 *     - users_name
 *    properties:
 *     users_id:
 *      type: integer
 *      description: De id van users.
 *     users_name:
 *      type: string
 *      description: De naam van users.
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *   tags: [Users]
 *   description: Haalt alle users op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Users'
 */

// GET ALLES
 router.get("/", function (req, res) {
  let db = database.GetDB();
  let results = [];
  db.all(
    "SELECT users_id, users_name FROM Users",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *   tags: [Users]
 *   description: Haalt 1 user op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Users'
 */

// GET :ID
router.get('/:id', function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get("SELECT users_id, users_name FROM Users WHERE users_id=" + id + ";", function(err, rows) {
      results.push(rows);
      res.json(results);
  });
  db.close();
});

/**
 * @swagger
 * /api/users/{id}/orders:
 *  get:
 *   tags: [Users]
 *   description: Haalt 1 User op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users van de webshop.
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Orders'
 */

router.get("/:id/orders", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];
db.all(
    "SELECT * FROM Orders WHERE users_id=" + id + ";",
    function (err, rows) {
        results.push(rows);
        res.json(results);
});
db.close();
});

//GET :ID/ORDERS
router.get('/:id/orders', function (req, res) {
  // const id = req.params.id;
  // let db = database.GetDB();
  // let results = [];

  // db.get("SELECT users_id, users_name FROM Users WHERE users_id=" + id + ";", function(err, rows) {
  //     results.push(rows);
  //     res.json(results);
  // });
  // db.close();
});

/**
 * @swagger
 * /api/users:
 *  post:
 *   tags: [Users]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Users'
 *        
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 */

router.post('/', function (req, res) {
  const NewName = req.body.users_name;
  let db = database.GetDB();

  if (!NewName) {
    res.status(400).json({ message: "products_name was null or empty"});
    return;
  }

  db.run("INSERT INTO Users (users_name, orders_id, countries_id) VALUES ('" + NewName + "', 0, 0);");

  res.status(404).json({ message: "You try to add: " + NewName });
  db.close();
  });

  module.exports = router;

/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *   tags: [Users]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Users'
 *        
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 */

// PATCH
router.patch("/:id", function (req, res) {
  const NewName = req.body.users_name;
  const id = req.params.id;
  // res.status(404).json({ message: "category does not exist" + NewName + " " + id });

  if (!NewName) {
    res.status(400).json({ message: "products_name was null or empty"});
    return;
  }

  let db = database.GetDB();
  db.run("UPDATE Users SET users_name = '" + NewName + "' WHERE users_id = " + id + ";");
  res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *   tags: [Users]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *        
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

// DELETE
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  db.run("DELETE FROM Users WHERE users_id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});