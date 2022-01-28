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
        categories: "Japan"
    });
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