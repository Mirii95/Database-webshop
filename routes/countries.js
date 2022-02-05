const express = require("express");
const { get } = require("express/lib/response");
const database = require("../database/database.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Countries:
 *    type: object
 *    required:
 *     - countries_id
 *     - countries_name
 *    properties:
 *     countries_id:
 *      type: integer
 *      description: De id van de Country.
 *     countries_name:
 *      type: string
 *      description: De naam van de Country.
 */

let categories = [
  { id: 1, name: "Dit zijn" },
  { id: 2, name: "geen echte" },
  { id: 3, name: "categorieën" },
  { id: 4, name: "zie routes/categories.js" },
];

/**
 * @swagger
 * /api/countries:
 *  get:
 *   tags: [Countries]
 *   description: Haalt alle Countries op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de Countries.
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
 *           $ref: '#/components/schemas/Countries'
 */

// GET ALLES
router.get("/", function (req, res) {
  let db = database.GetDB();
  let results = [];
  db.all(
    "SELECT countries_id, countries_name FROM countries",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/countries/{id}:
 *  get:
 *   tags: [Countries]
 *   description: Haalt alle Countries op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: countries_id
 *   responses:
 *    200:
 *     description: Json met de Countries.
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
 *           $ref: '#/components/schemas/Countries'
 */

// GET :ID
router.get("/:id", function (req, res) {
  // Haal het id uit de url op
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get(
    "SELECT countries_id, countries_name FROM countries WHERE countries_id=" +
      id +
      ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );

  db.close();
});

/**
 * @swagger
 * /api/countries:
 *  post:
 *   tags: [Countries]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Countries'
 *        
 *   responses:
 *    200:
 *     description: Json met de Countries.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Countries'
 */

// POST
router.post("/", function (req, res) {
  const NewName = req.body.countries_name;
  let db = database.GetDB();

  db.run("INSERT INTO countries (countries_name) VALUES ('" + NewName + "');");

  res.status(404).json({ message: "You try to add: " + NewName });
  db.close();
});

/**
 * @swagger
 * /api/countries/{id}:
 *  patch:
 *   tags: [Countries]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: countries_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Countries'
 *        
 *   responses:
 *    200:
 *     description: Json met de Countries.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Countries'
 */

// PATCH
router.patch("/:id", function (req, res) {
  const NewName = req.body.name;
  const id = req.params.id;
  res.status(404).json({ message: "category does not exist" + NewName });

  let db = database.GetDB();
  let results = [];

  // db.get("SELECT countries_id, countries_name FROM countries WHERE countries_id=" + id + ";", function(err, rows) {
  //     results.push(rows);
  //     res.json(results);
  // });

  db.close();
});

// DELETE
router.delete("/:id", function (req, res) {
  // Haal het id uit de url op
  const id = req.params.id;

  // let db = database.GetDB();
  // let results = [];

  // db.get("SELECT countries_id, countries_name FROM countries WHERE countries_id=" + id + ";", function(err, rows) {
  //     results.push(rows);
  //     res.json(results);
  // });

  // db.close();
});

module.exports = router;
