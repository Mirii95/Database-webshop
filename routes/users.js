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

router.post('/', function (req, res) {
    res.json({
      id: req.body.id,
      name: req.body.name,
    });
  });

  module.exports = router;