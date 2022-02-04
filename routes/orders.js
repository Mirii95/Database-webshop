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
 *     - products_id
 *     - users_id
 *     - countries_id
 *     - categories_id
 *    properties:
 *     orders_id:
 *      type: integer
 *      description: De id van de Order.
 *     countries_name:
 *      type: string
 *      description: De naam van de Order.
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

// • GET api/orders (alle)
// • GET api/orders/:id (één)
// • POST api/orders (nieuw)
// • => body: de nieuwe order met order-items
// • PATCH api/orders/:id (wijzig één)
//     • => /:id => van de te wijzigen order
//     • => body: de kolom/kolommen die je wilt wijzigen

router.get('/', function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
});

router.get('/:id', function (req, res) {
  res.json({
    id: req.body.id,
    name: req.body.name,
    // [
        //     { orders_id: 1, orders_name: 'Kimono Groen' },
        //     { orders_id: 2, orders_name: 'Homongi Blauw' },
        //     { orders_id: 3, orders_name: 'Yukata Paars' }
        // ]
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

  router.patch('/', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  module.exports = router;