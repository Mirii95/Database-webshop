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

router.get('/:id', function (req, res) {
  // Haal het id uit de url op
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  // [
        //     { products_id: 1, products_name: 'Kimono Groen' },
        //     { products_id: 2, products_name: 'Homongi Blauw' },
        //     { products_id: 3, products_name: 'Yukata Paars' }
        // ]

  db.get("SELECT products_id, products_name FROM products WHERE products_id=" + id + ";", function(err, rows) {
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



  module.exports = router;