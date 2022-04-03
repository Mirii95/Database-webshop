const express = require("express");
const { get } = require("express/lib/response");
const database = require("../database/connection.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Countries:
 *    type: object
 *    required:
 *     - id
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de Country.
 *     name:
 *      type: string
 *      description: De naam van de Country.
 */

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
  let results = {countries: []};
  db.all(
    "SELECT id, name FROM countries",
    function (err, rows) {
      results["countries"] = rows;
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
 *   description: Haalt 1 Country op waaraan een Product gekoppeld kan zijn.
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
    "SELECT id, name FROM countries WHERE id=" +
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
  const NewName = req.body.name;
  const REGEX = "^(\W{0,1})$";

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to post!" });
    return;
  }
  // if (!NewName) {
  //   res.status(400).json({ message: "name was null or empty"});
  //   return;
  // }

  if (NewName.length < 2) {
    res.status(403).json({ message: "Failed!" });
    return;
  }
  
  if (!NewName.match(/^[a-z ]+$/i)) {
    res.status(403).json({ message: "Must be text only!" });
    return;
  }

  let db = database.GetDB();
  db.run("INSERT INTO countries (name) VALUES ('" + NewName + "');");

  res.status(200).json({ message: "Succes!"});
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

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to patch!"});
    return;
  }

  // if (!NewName) {
  //   res.status(400).json({ message: "name was null or empty"});
  //   return;
  // }

  if (NewName.length < 2) {
    res.status(403).json({ message: "Failed!" });
    return;
  }
  
  if (!NewName.match(/^[a-z ]+$/i)) {
    res.status(403).json({ message: "Must be text only!" });
    return;
  }

  let db = database.GetDB();
  db.run("UPDATE Countries SET name = '" + NewName + "' WHERE id = " + id + ";");

  res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/countries/{id}:
 *  delete:
 *   tags: [Countries]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: countries_id
 *        
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

// DELETE
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to delete!"});
    return;
  }

  db.run("DELETE FROM Countries WHERE id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});

module.exports = router;