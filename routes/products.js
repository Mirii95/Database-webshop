const express = require("express");
const database = require("../database/connection.js");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Products:
 *    type: object
 *    required:
 *     - code
 *     - id
 *     - title
 *     - stock
 *     - price
 *     - desc
 *     - categories_id
 *    properties:
 *     code:
 *      type: string
 *      description: De code van de Product.
 *     id:
 *      type: integer
 *      description: De id van de Product.
 *     title:
 *      type: string
 *      description: De naam van de Product.
 *     stock:
 *      type: integer
 *      description: De stock van de Product.
 *     price:
 *      type: integer
 *      description: De prijs van de Product.
 *     desc:
 *      type: string
 *      description: De beschrijving van de Product.
 *     categories_id:
 *      type: integer
 *      description: De categories_id van de Product.
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   tags: [Products]
 *   description: search query.
 *   parameters:
 *    - in: query
 *      name: id
 *      schema:
 *       type: string
 *      required: false
 *      description: title of the product
 *   responses:
 *    200:
 *     description: Json met de products.
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
 *           $ref: '#/components/schemas/Products'
 */

router.get("/", function (req, res) {
  const id = req.params.id;
  
  const search = req.query.q;
  
  let db = database.GetDB();
  let results = {products: []};
  
  if (search != undefined) {
    // Do the other query
    db.all(
      "SELECT id, title FROM Products WHERE title LIKE '%" + search + "%';",
      function (err, rows) {
        results.push(rows);
        res.json(results);
      }
    );
  } else {
    db.all(
      // "SELECT products_id, products_title FROM Products",
      "SELECT * FROM Products",
      function (err, rows) {
        results["products"] = rows;

        for (let i = 0; i < results["products"].length; i++) {
          results["products"][i]["price_vat"] = Math.round(results["products"][i]["price"] * 1.21);
        }

        res.json(results);
      }
    );
  }
  db.close();
});


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   tags: [Products]
 *   description: Haalt 1 Country op waaraan een Product gekoppeld kan zijn.2
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id
 *   responses:
 *    200:
 *     description: Json met de products.
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
 *           $ref: '#/components/schemas/Products'
 */

router.get("/:id", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = {};
  
  db.get(
    "SELECT * FROM Products WHERE id=" +
      id +
      ";",
    function (err, row) {
      results = row;
      results["price_vat"] = Math.round(results["price"] * 1.21);
      res.json(results);
    }
  )

  db.close();
});

/**
 * @swagger
 * /api/products:
 *  post:
 *   tags: [Products]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Products'
 *        
 *   responses:
 *    200:
 *     description: Json met de products.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 */

router.post("/", function (req, res) {
  const NewTitle = req.body.title;
  const NewPrice = req.body.price;
  const NewDesc = req.body.desc;
  const NewCode = req.body.code;
  const NewStock = req.body.stock;
  const REGEX = "^[A-Za-z0-9 \-]*$";

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to post!" });
    return;
  }
  if (!NewTitle) {
    res.status(400).json({ message: "title was null or empty"});
    return;
  }
  if (!NewPrice && NewPrice != 0) {
    res.status(400).json({ message: "price was null or empty"});
    return;
  }
  if (!NewDesc) {
    res.status(400).json({ message: "desc was null or empty"});
    return;
  }
  if (!NewCode.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Code must contain text, numbers, whitespace and dashes only." });
    return;
  }
  if (!NewTitle.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Title must contain text, numbers, whitespace and dashes only." });
    return;
  }
    if (!NewDesc.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Description must contain text, numbers, whitespace and dashes only." });
    return;
  }

let db = database.GetDB();

db.run("INSERT INTO Products (code, title, price, stock, desc, categories_id)" +
"VALUES ('"+ NewCode +"', '" + NewTitle + "', " + NewPrice + ", " + NewStock + ", '" + NewDesc + "' ,0);");
  
db.close();
res.status(200).json({ message: "Succes!" });

});

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *   tags: [Products]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Products'
 *        
 *   responses:
 *    200:
 *     description: Json met de products.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 */

router.patch("/:id", function (req, res) {
  const id = req.params.id;
  const NewCode = req.body.code;
  const NewTitle = req.body.title;
  const NewDesc = req.body.desc;
  const REGEX = "^[A-Za-z0-9 \-]*$";

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to patch!"});
    return;
  }

  if (!NewCode.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Code must contain text, numbers, whitespace and dashes only." });
    return;
  }
  if (!NewTitle.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Title must contain text, numbers, whitespace and dashes only." });
    return;
  }
    if (!NewDesc.match(/^[0-9A-Za-z\s\-]+$/)) {
    res.status(400).json({ message: "Description must contain text, numbers, whitespace and dashes only." });
    return;
  }
  // TODO: Niet ingevulde gegevens moeten niet aangepast worden,
  let db = database.GetDB();
  db.run("UPDATE Products SET code = '" + NewCode + "', title = '" + NewTitle + "', desc = '" + NewDesc + "' WHERE id = " + id + ";");
  res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   tags: [Products]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: products_id
 *        
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  if (!req.userAdmin){
    res.status(403).json({ message: "You are not authorised to delete!"});
    return;
  }

  db.run("DELETE FROM Products WHERE id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});

module.exports = router;