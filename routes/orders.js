// • GET api/orders (alle)
// • GET api/orders/:id (één)
// • POST api/orders (nieuw)
// • => body: de nieuwe order met order-items
// • PATCH api/orders/:id (wijzig één)
//     • => /:id => van de te wijzigen order
//     • => body: de kolom/kolommen die je wilt wijzigen

// getOrderDetails()
// addOrderDetails()
// updateOrderDetails()
// deleteOrderDetails()

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

router.post('/', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  module.exports = router;