const express = require("express");
const database = require("../database/database.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - id
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de Category.
 *     name:
 *      type: string
 *      description: De naam van de Category.
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *   tags: [Category]
 *   description: Haalt alle Categories op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de Categories.
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
 *           $ref: '#/components/schemas/Category'
 */

// GET ALLES
router.get("/", function (req, res) {
//   db.Dinges();
  res.json({
    categories: categories,
    
  });
});

// GET :ID
router.get("/:id/products", function (req, res) {
  res.status(404).json({ message: "category does not exist" });

  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get(
    "SELECT categories_id, categories_name FROM categories WHERE categories_id=" +
      id +
      ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  // Zoek de categorie in de categories array. Ook
  // dit moet later uit een database komen
  const category = categories.find((c) => c.id == id);
  if (category) {
    // Geef als resultaat de gevonden categorie als deze bestaat
    res.json(category);
  } else {
    // Geef een 404 (Not Found) terug als de category niet bestaat
    res.status(404).json({ message: "category does not exist" });
  }
});

// Geef de router aan het bestand die deze module heeft ge-required.
// Dit bestand is in dit geval index.js

/**
 * @swagger
 * /api/categories:
 *  post:
 *   tags: [Categories]
 *   description: Maakt een nieuwe Category.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Category'
 *   responses:
 *    200:
 *     description: Json met de gemaakte Category.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Category'
 */

router.post("/", function (req, res) {
  res.status(404).json({ message: "category does not exist" });
});

router.patch("/:id", function (req, res) {
  res.status(404).json({ message: "category does not exist" });
});

/**
 * @swagger
 * /api/categories/:
 *   delete:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: What to delete
 *       in: formData
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Deleted isch
 *       404:
 *         description: Failed
 *
 */

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  const category = categories.find((c) => c.id == id);
  if (category) {
    // Geef als resultaat de gevonden categorie als deze bestaat
    res.json(category);
  } else {
    // Geef een 404 (Not Found) terug als de category niet bestaat
    res.status(404).json({ message: "category does not exist" });
  }
  // res.status(404).json({message: "category does not exist"});
});

module.exports = router;