require('dotenv').config();
const express = require('express');
const db = require('./database/connection.js');
const CheckAuth = require('./middleware/checkAuth.js');
const jwt = require('jsonwebtoken');

// ================================================ CREATION ===========
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const app = express();

// ================================================ SERVE FRONTEND =====
// const SECRET_TOKEN = process.env.SECRET_TOKEN;
app.use(express.static('../public'));

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'Mijn Webshop API',
        version: '1.0.0',
        description: 'De API-gedeelte van de back-end.'
    },
},
    apis: ['./routes/*.js'],
};
    
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// ================================================ MIDDLEWARE =========
app.use(express.json()); // Adds the json body to the request object.
app.use(CheckAuth.TimeTester);
app.use(CheckAuth.AuthTest);
// ================================================ ROUTES =============
app.use('/api/categories', require('./routes/categories'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// ================================================ START ==============
// app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.get("/", (req, res) => {
//     res.json({ message: "Welkom bij de webshop-api" });
// });

db.CREATE_TABLES();
console.log(db.HashPassword("1"));
const server = app.listen(process.env.PORT || 8080, () => {
    let name = process.env.APP_NAME || 'app';
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
}); 