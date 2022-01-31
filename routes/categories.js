/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - id
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van de Category.
 *     name:
 *      type: string
 *      description: De naam van de Category.
 */

 const express = require('express');

// • GET api/categories (alle)
// • GET api/categories/:id/products
// • GET api/categories/:id (één)

// • POST api/categories (nieuw)
//     • => body: de nieuwe category
// • PATCH api/categories/:id (wijzig één)
//     • => /:id => van de te wijzigen category
//     • => body: de kolom/kolommen die je wilt wijzigen
// • DELETE api/categories/:id (verwijder één)

// Maak een nieuwe router aan
const router = express.Router();

let categories = [
    { id: 1, name: "Dit zijn" },
    { id: 2, name: "geen echte" },
    { id: 3, name: "categorieën" },
    { id: 4, name: "zie routes/categories.js" }
];

// De totale route is /api/categories/ (zie index.js)
// Deze route wordt alleen bij een GET request geactiveerd.

/**
 * @swagger
 * /api/categories:
 *  get:
 *   tags: [Categories]
 *   description: Haalt alle Categories op waaraan een Product gekoppeld kan zijn.
 *   responses:  
 *    200:
 *     description: Json met de Categories.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Category'
 */  

router.get('/', function (req, res) {
    // Vul de response met data. Deze data moet natuurlijk 
    // uit een database komen. 
    res.json({
        categories: categories
    });
});

router.get('/:id/products', function (req, res) {
    res.status(404).json({message: "category does not exist"}); 
});

// De totale route is /api/categories/:id
// :id is hier een placeholder. Wat er op de plaats 
// van :id staat, kun je terugvinden in req.params.id
router.get('/:id', function (req, res) {
    // Haal het id uit de url op
    const id = req.params.id;
    // Zoek de categorie in de categories array. Ook
    // dit moet later uit een database komen
    const category = categories.find(c => c.id == id);
    if(category){
        // Geef als resultaat de gevonden categorie als deze bestaat
        res.json(category);
    } else {
        // Geef een 404 (Not Found) terug als de category niet bestaat
        res.status(404).json({message: "category does not exist"}); 
    }
});

// Geef de router aan het bestand die deze module heeft ge-required.
// Dit bestand is in dit geval index.js

    /**
 * @swagger
 * /api/categories:
 *  post:
 *   tags: [Categories]
 *   description: Maakt een nieuwe Category.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Category'
 *   responses:  
 *    200:
 *     description: Json met de gemaakte Category.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Category'
 */

router.post('/', function (req, res) {
    res.status(404).json({message: "category does not exist"}); 
});

router.patch('/:id', function (req, res) {
    res.status(404).json({message: "category does not exist"}); 
});

router.delete('/:id', function (req, res) {
    res.status(404).json({message: "category does not exist"}); 
});

module.exports = router;