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
 *   description: Haalt alle Products op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de Products.
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
    "SELECT products_id, products_name FROM products",
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
 *   description: Haalt alle Products op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *   responses:
 *    200:
 *     description: Json met de Products.
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
    "SELECT products_id, products_name FROM products WHERE products_id=" +
      id +
      ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );

  db.close();
});

router.post("/", function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
});

router.patch("/:id", function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
});

router.delete("/:id", function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
});

module.exports = router;
