const express = require('express');
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

// CREATION

const app = express();
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
