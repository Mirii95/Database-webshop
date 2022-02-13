require('dotenv').config();
const express = require('express');
const db = require('./database/connection.js');
const CheckAuth = require('./middleware/checkAuth.js');
const jwt = require('jsonwebtoken');
require('crypto').randomBytes(64).toString('hex');
// ================================================ CREATION ===========
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const app = express();

// ================================================ SERVE FRONTEND =====
const SECRET_TOKEN = "552544e02c24f6552d03b5e4ec2185598a14fae9e5900577975b1dea49535c4c44666e22c788a074162e7c33a491caeca2df3a122d3c0963d0a684e076535ea6";
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
app.use(express.json()); // adds the json body to the request object
app.use(CheckAuth.TimeTester);
app.use(CheckAuth.AuthTest);
// ================================================ ROUTES =============
app.use('/api/categories', require('./routes/categories'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// ================================================ START ==============
// app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.get("/", (req, res) => {
//     res.json({ message: "Welkom bij de webshop-api" });
// });

db.CREATE_TABLES();
const server = app.listen(process.env.PORT || 8080, () => {
    let name = process.env.APP_NAME || 'app';
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
}); 