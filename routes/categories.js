const express = require("express");
const database = require("../database/connection.js");
const CheckAuth = require('../middleware/checkAuth.js');
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
    // let results = [];
    let results = {categories: []};
  db.all(
      "SELECT categories_id, categories_name FROM categories",
      function (err, rows) {
          results["categories"] = rows;
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

router.post("/",  function (req, res) {
    const NewName = req.body.name;
    
    if (!req.userAdmin){
      res.status(403).json({ message: "You are not authorised to post!" });
      return;
    }

    if (NewName.match(/^(\W{0,1})$/i)) {
      res.status(403).json({ message: "Failed!" });
      return;
    }

    if (NewName.match(/\d/)) {
      res.status(403).json({ message: "Must contain text only, and be a minimum of 2 characters long" });
      return;
    }

    let db = database.GetDB();
    db.run("INSERT INTO categories (categories_name, orders_id) VALUES ('" + NewName + "', 0);");
  
    res.status(200).json({ message: "success"});
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
//CheckAuth.authenticateToken,
router.patch("/:id", function (req, res) {
  const NewName = req.body.name;
  const id = req.params.id;
  let db = database.GetDB();

  if (!NewName) {
    res.status(400).json({ message: "products_name was null or empty"});
    return;
  }

  if (NewName.match(/^(\W{0,1})$/i)) {
    res.status(403).json({ message: "Failed!" });
    return;
  }

  if (NewName.match(/\d/)) {
    res.status(403).json({ message: "Must contain text only, and be a minimum of 2 characters long" });
    return;
  }
  
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

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to delete!"});
    return;
  }
  
  var results = [];

  db.get("SELECT COUNT(products_id) AS NumberOfProducts FROM products WHERE products_id=" + id + ";",
    function (err, rows) {
      results.push(rows);
      if(results[0]["NumberOfProducts"]>0) {
        res.status(403).json({ message: "You can't delete categories when there are still products in there."});
      } else {
        db.run("DELETE FROM Categories WHERE categories_id = " + id + ";");
        res.status(200).json({ message: "Success!" });
      }
    }
  );

  db.close();
});

module.exports = router;