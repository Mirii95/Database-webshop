const express = require('express');
const database = require('../database/database.js')
const router = express.Router();
// getOrderDetails()
// addOrderDetails()
// updateOrderDetails()
// deleteOrderDetails()

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

// {
//     "status" = "succes",
//     "total_results" = 3,
//     "orders" [{
//         "id": 1,
//         "name": "kimonoRood",
//         "title": "rode rozen kimono",
//         "country": "Japan",
//         "customerId": 1
//     }, {
//         "id": 2,
//         "name": "kimonoBlauw",
//         "title": "sterren kimono",
//         "country": "Korea",
//         "customerId": 2
//     }, {
//         "id": 3,
//         "name": "kimonoWit",
//         "title": "sneeuw kimono",
//         "country": "Thailand",
//         "customerId": 3
//     }]
// }

router.get('/', function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
});

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

router.get('/:id', function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });

  res.status(404).json({message: "category does not exist"}); 
  // Haal het id uit de url op
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get("SELECT orders_id, orders_name FROM orders WHERE orders_id=" + id + ";", function(err, rows) {
    results.push(rows);
    res.json(results);
  });

  db.close();

});

router.post('/', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  router.patch('/:id', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  module.exports = router;