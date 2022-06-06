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
 *     - id
 *     - date
 *     - paid
 *     - shipped
 *     - products_id
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de Order.
 *     date:
 *      type: string
 *      description: De naam van de Order.
 *     paid:
 *      type: integer
 *      description: De prijs van de Order.
 *     shipped:
 *      type: integer
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
  let results = {orders: []};

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to get!"});
    return;
  }

  db.all(
    "Select * from orders " +
      "left join order_lines ON orders.id=order_lines.orders_id " +
      "left join products ON order_lines.products_id=products.id " +
      "left join users ON orders.users_id=users.id ",
    function (err, rows) {
      let DifferentOrders = {};
      let count = 0;
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        if (element["orders_id"] in DifferentOrders) {
          // This already exists here:
        } else {
          DifferentOrders[element["orders_id"]] = count;
          results["orders"][count] = {};
          results["orders"][count]["order_lines"] = [];
          count++;
        }
      }

      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        let order_index = DifferentOrders[element["orders_id"]];

        results["orders"][order_index]["id"] = element["orders_id"];
        results["orders"][order_index]["date"] = element["date"];
        results["orders"][order_index]["paid"] = element["paid"];
        results["orders"][order_index]["shipped"] = element["shipped"];

        let l = results["orders"][order_index]["order_lines"].length;

        results["orders"][order_index]["order_lines"][l] = {};
        results["orders"][order_index]["order_lines"][l]["amount"] =
          element["amount"];
        results["orders"][order_index]["order_lines"][l]["total_price"] =
          element["amount"] * element["aankoop_price"];
        results["orders"][order_index]["order_lines"][l]["product"] = {};
        results["orders"][order_index]["order_lines"][l]["product"]["title"] =
          element["title"];

        let userDict = {
          id: element["users_id"],
          firstname: element["firstname"],
          infix: element["infix"],
          lastname: element["lastname"],
        };
        results["orders"][order_index]["user"] = userDict;
      }

      res.json(results);
    }
  );
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
  // const NewName = req.body.name;
  // const NewPrice = req.body.price;
  // const NewDesc = req.body.desc;
  const NewShipped = req.body.shipped;
  const NewDate = req.body.date;
  const lines = [{
    "product": 2,
    "amount": 3
  },
  {
    "product": 1,
    "amount": 1
  },
  {
    "product": 3,
    "amount": 5
}];
  let db = database.GetDB();

  // if (!req.userTemp){
  //   res.status(403).json({ message: "You are not authorised to post!"});
  //   return;
  // }
  // if (!NewDate) {
  //   res.status(400).json({ message: "Date was null or empty"});
  //   return;
  // }
  // if (!NewPaid) {
  //   res.status(400).json({ message: "Paid was null or empty"});
  //   return;
  // }
  // if (!NewShipped) {
  //   res.status(400).json({ message: "Shipped was null or empty"});
  //   return;
  // }

  // if (!NewName) {
  //   res.status(400).json({ message: "name was null or empty"});
  //   return;
  // }
  // if (!NewPrice && NewPrice != 0) {
  //   res.status(400).json({ message: "price was null or empty"});
  //   return;
  // }
  // if (!NewDesc) {
  //   res.status(400).json({ message: "desc was null or empty"});
  //   return;
  // }

  // db.run("INSERT INTO Orders (name, price, desc, products_id, users_id, countries_id, categories_id)" +
  // "VALUES ('" + NewName + "'," + NewPrice + ",'" + NewDesc + "', 0, 0, 0, 0);");
  // console.log(db.run("INSERT INTO orders (date, paid, shipped, users_id) " +
  // "VALUES ('" + NewDate + "'," + NewPaid + "," + NewShipped + ", 0)",
  db.run("INSERT INTO orders (paid, shipped, users_id) " +
  "VALUES (0, 0, 0)",
  function(err, rows) {
    console.info(err);
    console.info(rows);
    res.status(200).json({ message: "Succes!"});
  });

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
    const NewShipped = req.body.shipped;
    const NewDate = req.body.date;
    const id = req.params.id;
    if (!req.userAdmin){
      res.status(403).json({ message: "You are not authorised to patch!"});
      return;
    }

    NewDate
    console.log(NewShipped, NewDate);
  
    let db = database.GetDB();
    db.run("UPDATE orders SET shipped = " + NewShipped + ", date = '" + NewDate + "' WHERE id = " + id + ";");
    res.status(200).json({ message: "Changed!" });
    db.close();
  });

  module.exports = router;