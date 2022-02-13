const express = require('express');
const database = require('../database/connection.js');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Orders:
 *    type: object
 *    required:
 *     - orders_id
 *     - orders_name
 *     - orders_price
 *     - orders_desc
 *    properties:
 *     orders_id:
 *      type: integer
 *      description: De id van de Order.
 *     orders_name:
 *      type: string
 *      description: De naam van de Order.
 *     orders_price:
 *      type: number
 *      description: De prijs van de Order.
 *     orders_desc:
 *      type: string
 *      description: De beschrijving van de Order.
 */

/**
 * @swagger
 * /api/orders:
 *  get:
 *   tags: [Orders]
 *   description: Haalt alle Orders op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de Orders.
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

router.get('/', function (req, res) {
  let db = database.GetDB();
  let results = [];

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to get!"});
    return;
  }

  db.all(
    "SELECT orders_id, orders_name, orders_price, orders_desc FROM Orders",
    function (err, rows) {
      results.push(rows);
      res.json(results);
      console.log(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/orders/{id}:
 *  get:
 *   tags: [Orders]
 *   description: Haalt 1 Order op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: orders_id
 *   responses:
 *    200:
 *     description: Json met de orders.
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

router.get('/:id', function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get("SELECT orders_id, orders_name, orders_price, orders_desc FROM Orders WHERE orders_id=" + id + ";", function(err, rows) {
    results.push(rows);
    res.json(results);
  });
  db.close();
});

/**
 * @swagger
 * /api/orders:
 *  post:
 *   tags: [Orders]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Orders'
 *        
 *   responses:
 *    200:
 *     description: Json met de orders.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Orders'
 */
router.post('/', function (req, res) {
  const NewName = req.body.orders_name;
  const NewPrice = req.body.orders_price;
  const NewDesc = req.body.orders_desc;
  let db = database.GetDB();

  if (!req.userTemp){
    res.status(403).json({ message: "You are not authorised to post!"});
    return;
  }

  if (!NewName) {
    res.status(400).json({ message: "products_name was null or empty"});
    return;
  }
  if (!NewPrice && NewPrice != 0) {
    res.status(400).json({ message: "products_price was null or empty"});
    return;
  }
  if (!NewDesc) {
    res.status(400).json({ message: "products_desc was null or empty"});
    return;
  }

  db.run("INSERT INTO Orders (orders_name, orders_price, orders_desc, products_id, users_id, countries_id, categories_id)" +
  "VALUES ('" + NewName + "'," + NewPrice + ",'" + NewDesc + "', 0, 0, 0, 0);");

  res.status(200).json({ message: "You try to add: " + NewName + NewPrice + NewDesc });
  db.close();
  });

  /**
 * @swagger
 * /api/orders/{id}:
 *  patch:
 *   tags: [Orders]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: orders_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Orders'
 *        
 *   responses:
 *    200:
 *     description: Json met de Orders.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Orders'
 */

  router.patch('/:id', function (req, res) {
    const NewName = req.body.orders_name;
    const NewPrice = req.body.orders_price;
    const NewDesc = req.body.orders_desc;
    const id = req.params.id;
    // res.status(404).json({ message: "category does not exist" + NewName + " " + id });

    if (!req.userAdmin){
      res.status(403).json({ message: "You are not authorised to patch!"});
      return;
    }

    if (!NewName) {
      res.status(400).json({ message: "products_name was null or empty"});
      return;
    }
    if (!NewPrice && NewPrice != 0) {
      res.status(400).json({ message: "products_price was null or empty"});
      return;
    }
    if (!NewDesc) {
      res.status(400).json({ message: "products_desc was null or empty"});
      return;
    }
  
    let db = database.GetDB();
    db.run("UPDATE Orders SET orders_name = '" + NewName + "', orders_price = " + NewPrice + ", orders_desc = '" + NewDesc + "' WHERE orders_id = " + id + ";");
    res.status(200).json({ message: "Changed!" });
    db.close();
  });

  module.exports = router;