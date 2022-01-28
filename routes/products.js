// GET api/products (alle)
// • GET api/products/:id (één)
// • POST api/products (nieuw)
    //• => body: het nieuwe product
// • PATCH api/products/:id (wijzig één)
    //• => /:id => van het te wijzigen product
    //• => body: de kolom/kolommen die je
//              wilt wijzigen
// • DELETE api/products/:id (verwijder éen)́

// getProductDetails()
// addProductDetails()
// updateProductDetails()
// deleteProductDetails()

// {
//     "status" = "succes",
//     "total_results" = 3,
//     "products" [{
//         "id": 1,
//         "name": "Kimono"
//     }, {
//         "id": 2,
//         "name": "Obi"
//     }, {
//         "id": 3,
//         "name": "Haori"
//     }]
// }

router.post('/', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  module.exports = router;