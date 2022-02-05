const express = require("express");
const database = require("../database/database.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Products:
 *    type: object
 *    required:
 *     - products_id
 *     - products_name
 *    properties:
 *     products_id:
 *      type: integer
 *      description: De id van de Product.
 *     products_name:
 *      type: string
 *      description: De naam van de Product.
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   tags: [Products]
 *   description: Haalt alle products op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de products.
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

router.get("/", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.all(
    "SELECT products_id, products_name FROM Products",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   tags: [Products]
 *   description: Haalt 1 Country op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *   responses:
 *    200:
 *     description: Json met de products.
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
router.get("/:id", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get(
    "SELECT products_id, products_name FROM Products WHERE products_id=" +
      id +
      ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );

  db.close();
});

/**
 * @swagger
 * /api/products:
 *  post:
 *   tags: [Products]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Products'
 *        
 *   responses:
 *    200:
 *     description: Json met de products.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 */

router.post("/", function (req, res) {
  const NewName = req.body.products_name;
  let db = database.GetDB();

  db.run("INSERT INTO Products (products_name) VALUES ('" + NewName + "');");

  res.status(404).json({ message: "You try to add: " + NewName });
  db.close();
});

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *   tags: [Products]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Products'
 *        
 *   responses:
 *    200:
 *     description: Json met de products.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 */

router.patch("/:id", function (req, res) {
  const NewName = req.body.products_name;
  const id = req.params.id;
  // res.status(404).json({ message: "category does not exist" + NewName + " " + id });

  let db = database.GetDB();
  db.run("UPDATE Products SET products_name = '" + NewName + "' WHERE products_id = " + id + ";");
  res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   tags: [Products]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *        
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  db.run("DELETE FROM Products WHERE products_id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});

module.exports = router;