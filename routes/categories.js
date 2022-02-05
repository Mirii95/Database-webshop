const express = require("express");
const database = require("../database/database.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - id
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de Category.
 *     name:
 *      type: string
 *      description: De naam van de Category.
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *   tags: [Category]
 *   description: Haalt alle Categories op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de Categories.
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
 *           $ref: '#/components/schemas/Category'
 */

// GET ALLES
router.get("/", function (req, res) {
    let db = database.GetDB();
    let results = [];
  db.all(
      "SELECT categories_id, categories_name FROM categories",
      function (err, rows) {
          results.push(rows);
          res.json(results);
  });
  db.close();
});

/**
 * @swagger
 * /api/categories/{id}/products:
 *  get:
 *   tags: [Category]
 *   description: Haalt 1 Category op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Categories van de webshop.
 *   responses:
 *    200:
 *     description: Json met de Categories.
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
 *           $ref: '#/components/schemas/Products'
 */

// GET ID FROM PRODUCTS
router.get("/:id/products", function (req, res) {
    const id = req.params.id;
    let db = database.GetDB();
    let results = [];
  db.all(
      "SELECT * FROM Products WHERE categories_id=" + id + ";",
      function (err, rows) {
          results.push(rows);
          res.json(results);
  });
  db.close();
});

/**
 * @swagger
 * /api/categories/{id}:
 *  get:
 *   tags: [Category]
 *   description: Haalt 1 Category op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Categories van de webshop.
 *   responses:
 *    200:
 *     description: Json met de Categories.
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
 *           $ref: '#/components/schemas/Category'
 */

// GET :ID
router.get("/:id", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get("SELECT categories_id, categories_name FROM categories WHERE categories_id=" + id + ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/categories:
 *  post:
 *   tags: [Category]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Category'
 *        
 *   responses:
 *    200:
 *     description: Json met de Categories.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Category'
 */

router.post("/", function (req, res) {
    const NewName = req.body.name;
    let db = database.GetDB();

    db.run("INSERT INTO categories (categories_name, orders_id) VALUES ('" + NewName + "', 0);");
  
    res.status(200).json({ message: "You try to add: " + NewName });
    db.close();
});

/**
 * @swagger
 * /api/categories/{id}:
 *  patch:
 *   tags: [Category]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: categories_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Category'
 *        
 *   responses:
 *    200:
 *     description: Json met de Categories.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Category'
 */

router.patch("/:id", function (req, res) {
  const NewName = req.body.name;
  const id = req.params.id;
  let db = database.GetDB();

  db.run("UPDATE Categories SET categories_name = '" + NewName + "' WHERE categories_id = " + id + ";");
  res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/categories/{id}:
 *  delete:
 *   tags: [Category]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: categories_id
 *        
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  db.run("DELETE FROM Categories WHERE categories_id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});

module.exports = router;