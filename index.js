require('dotenv').config();
const express = require('express');

// ================================================ CREATION ===========
const app = express();

// ================================================ SERVE FRONTEND =====
app.use(express.static('../public'));

// ================================================ MIDDLEWARE =========
app.use(express.json()); // adds the json body to the request object

// ================================================ ROUTES =============
app.use('/api/categories', require('./routes/categories'));

// ================================================ START ==============
const server = app.listen(process.env.PORT || 8080, () => {
    let name = process.env.APP_NAME || 'app';
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
});