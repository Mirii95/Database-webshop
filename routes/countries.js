const express = require('express');
const database = require('../database/database.js')

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

// Maak een nieuwe router aan
const router = express.Router();

let categories = [
    { id: 1, name: "Dit zijn" },
    { id: 2, name: "geen echte" },
    { id: 3, name: "categorieën" },
    { id: 4, name: "zie routes/categories.js" }
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

router.get('/', function (req, res) {
    // Vul de response met data. Deze data moet natuurlijk 
    // uit een database komen.
    let db = database.GetDB();
    let results = [];
    // [
        //     { countries_id: 1, countries_name: 'Japan' },
        //     { countries_id: 2, countries_name: 'Korea' },
        //     { countries_id: 3, countries_name: 'Thailand' }
        // ]
        db.all("SELECT countries_id, countries_name FROM countries", function(err, rows) {
            results.push(rows);
            res.json(results);
        });
        
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
    // De totale route is /api/categories/:id
    // :id is hier een placeholder. Wat er op de plaats 
    // van :id staat, kun je terugvinden in req.params.id
    router.get('/:id', function (req, res) {
        // Haal het id uit de url op
        const id = req.params.id;
        let db = database.GetDB();
        let results = [];
        
        db.get("SELECT countries_id, countries_name FROM countries WHERE countries_id=" + id + ";", function(err, rows) {
            results.push(rows);
            res.json(results);
        });
        
        db.close();
    });
    
    // • GET api/countries (alle)
    // • GET api/countries/:id (één)
    // • POST api/countries (nieuw)
    //     • => body: de nieuwe country
    // • PATCH api/countries/:id (wijzig één)
    //     • => /:id => van de te wijzigen country
    //     • => body: de kolom/kolommen die je wilt wijzigen
    // • DELETE api/countries/:id (verwijder één)

    router.post('/', function (req, res) {
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

router.patch('/:id', function (req, res) {
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
    
    // let db = database.GetDB();
    //     let results = [];
        
    //     db.get("SELECT countries_id, countries_name FROM countries WHERE countries_id=" + id + ";", function(err, rows) {
    //         results.push(rows);
    //         res.json(results);
    //     });
        
    //     db.close();
});

router.delete('/:id', function (req, res) {
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

// getCountryDetails()
// addCountryDetails()
// updateCountryDetails()
// deleteCountryDetails()

// {
//     "status" = "succes",
//     "total_results" = 3,
//     "countries" [{
//         "id": 1,
//         "name": "Japan"
//     }, {
//         "id": 2,
//         "name": "Korea"
//     }, {
//         "id": 3,
//         "name": "Thailand"
//     }]
// }

module.exports = router;