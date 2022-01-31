const express = require('express');

// Maak een nieuwe router aan
const router = express.Router();

let categories = [
    { id: 1, name: "Dit zijn" },
    { id: 2, name: "geen echte" },
    { id: 3, name: "categorieën" },
    { id: 4, name: "zie routes/categories.js" }
];
// • GET api/countries (alle)
// • GET api/countries/:id (één)
// • POST api/countries (nieuw)
//     • => body: de nieuwe country
// • PATCH api/countries/:id (wijzig één)
//     • => /:id => van de te wijzigen country
//     • => body: de kolom/kolommen die je wilt wijzigen
// • DELETE api/countries/:id (verwijder één)

router.get('/', function (req, res) {
    // Vul de response met data. Deze data moet natuurlijk 
    // uit een database komen. 
    res.json({
        countries: "Japan"
    });
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
});

router.delete('/:id', function (req, res) {
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