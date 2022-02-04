// • GET api/users (alle)
// • GET api/users/:id (één)
// • GET api/users/:id/orders
// • POST api/users (nieuw)
//     • => body: de nieuwe country
// • PATCH api/users/:id (wijzig één)
//     • => /:id => van de te wijzigen user
//     • => body: de kolom/kolommen die je wilt wijzigen
// • DELETE api/users/:id (verwijder één)

// getUserDetails()
// addUserDetails()
// updateUserDetails()
// deleteUserDetails()

// {
//     "status" = "succes",
//     "total_results" = 3,
//     "users" [{
//         "id": 1,
//         "customer": 1
//     }, {
//         "id": 2,
//         "customer": 2
//     }, {
//         "id": 3,
//         "customer": 3
//     }]
// }

router.get('/:id', function (req, res) {
  // Haal het id uit de url op
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  // [
        //     { users_id: 1, users_name: 'Tessa' },
        //     { users_id: 2, users_name: 'Philip' },
        //     { users_id: 3, users_name: 'Mirjam' }
        // ]

  db.get("SELECT users_id, users_name FROM users WHERE users_id=" + id + ";", function(err, rows) {
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