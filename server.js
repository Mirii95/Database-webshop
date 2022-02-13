const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

	// Root path
	app.get("/", (req, res) => {
	    res.json({ message: "Welkom bij de webshop-api" });
});

	// Start server
	app.listen(process.env.HTTP_PORT, () => {
	    console.log(`Server running on port ${process.env.HTTP_PORT}`);
});