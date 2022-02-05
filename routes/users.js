const express = require('express');
const database = require('../database/database.js')
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Users:
 *    type: object
 *    required:
 *     - users_id
 *     - users_name
 *    properties:
 *     users_id:
 *      type: integer
 *      description: De id van de User.
 *     users_name:
 *      type: string
 *      description: De naam van de User.
 */

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

/**
 * @swagger
 * /api/users:
 *  get:
 *   tags: [Users]
 *   description: Haalt alle Users op waaraan een Product gekoppeld kan zijn.
 *   responses:  
 *    200:
 *     description: Json met de Users.
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
 *           $ref: '#/components/schemas/Users'
 */

router.get('/:id', function (req, res) {
  // Haal het id uit de url op
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

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