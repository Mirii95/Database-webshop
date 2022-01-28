// • GET api/categories (alle)
// • GET api/categories/:id/products
// • GET api/categories/:id (één)
// • POST api/categories (nieuw)
//     • => body: de nieuwe category
// • PATCH api/categories/:id (wijzig één)
//     • => /:id => van de te wijzigen category
//     • => body: de kolom/kolommen die je wilt wijzigen
// • DELETE api/categories/:id (verwijder één)

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
      res.json({
        categories: categories
      });
    });

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
      res.json({
        id: req.body.id,
        name: req.body.name,
      });
    });
    
// {
//     "status" = "succes",
//     "total_results" = 3,
//     "categories" [{
//         "id": 1,
//         "name": "kimonoRood",
//         "title": "rode rozen kimono"
//     }, {
//         "id": 2,
//         "name": "kimonoBlauw",
//         "title": "sterren kimono"
//     }, {
//         "id": 3,
//         "name": "kimonoWit",
//         "title": "sneeuw kimono"
//     }]
// }

// getCategoryDetails()
// addCategoryDetails()
// updateCategoryDetails()
// deleteCategoryDetails()

module.exports = router;