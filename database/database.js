var sqlite3 = require("sqlite3").verbose();
const USE_MEM_DB = false;

 
function GetDB() {
    if (USE_MEM_DB) {
          return db = new sqlite3.Database(':memory:');
    } else {
        return new sqlite3.Database("./database/create_database.sql");
    }
}

function TEST() {
    let db = GetDB();
    db.serialize(function() {
        db.run("CREATE TABLE lorem (info TEXT)");
      
        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();
      
        db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            console.log(row.id + ": " + row.info);
        });
      });
}

const TABLE_ONE = `
CREATE TABLE "categories" (
	"categories_id"	INTEGER NOT NULL UNIQUE,
	"categories_name"	TEXT NOT NULL,
	"orders_id"	INTEGER NOT NULL,
	FOREIGN KEY("orders_id") REFERENCES "orders"("orders_id"),
	PRIMARY KEY("categories_id" AUTOINCREMENT)
);
`;

const TABLE_TWO = `
CREATE TABLE "countries" (
	"countries_id"	INTEGER NOT NULL UNIQUE,
	"countries_name"	TEXT NOT NULL,
	PRIMARY KEY("countries_id" AUTOINCREMENT)
);
`
const TABLE_THREE = `
CREATE TABLE "orders" (
	"orders_id"	INTEGER NOT NULL UNIQUE,
	"orders_name"	TEXT NOT NULL,
	"orders_price"	NUMERIC NOT NULL,
	"orders_desc"	TEXT,
	"products_id"	INTEGER NOT NULL,
	"users_id"	INTEGER NOT NULL,
	"countries_id"	INTEGER NOT NULL,
	"categories_id"	INTEGER NOT NULL,
	FOREIGN KEY("products_id") REFERENCES "products"("products_id"),
	FOREIGN KEY("countries_id") REFERENCES "countries"("countries_id"),
	FOREIGN KEY("users_id") REFERENCES "users"("users_id"),
	FOREIGN KEY("categories_id") REFERENCES "categories"("categories_id"),
	PRIMARY KEY("orders_id" AUTOINCREMENT)
);
`
const TABLE_FOUR = `
CREATE TABLE "products" (
	"products_id"	INTEGER NOT NULL UNIQUE,
	"products_name"	TEXT NOT NULL,
	"products_price"	NUMERIC NOT NULL,
	"products_desc"	TEXT,
	"categories_id"	INTEGER NOT NULL,
	PRIMARY KEY("products_id" AUTOINCREMENT)
);
`
const TABLE_FIVE = `
CREATE TABLE "users" (
	"users_id"	INTEGER NOT NULL UNIQUE,
	"users_name"	TEXT NOT NULL,
	"orders_id"	INTEGER NOT NULL,
	"countries_id"	INTEGER NOT NULL,
	FOREIGN KEY("countries_id") REFERENCES "countries"("countries_id"),
	FOREIGN KEY("orders_id") REFERENCES "orders"("orders_id"),
	PRIMARY KEY("users_id" AUTOINCREMENT)
);
`

function CREATE_TABLES() {
    let db = GetDB();
    
    // TODO: Deze delete functions blijken nog niet te werken. FIX HET. 

    db.serialize(function() {
        // Drop tables if they exist
        db.run('DROP TABLE IF EXISTS "categories";');
        db.run('DROP TABLE IF EXISTS "countries";');
        db.run('DROP TABLE IF EXISTS "orders";');
        db.run('DROP TABLE IF EXISTS "products";');
        db.run('DROP TABLE IF EXISTS "users";');
        
        // Create tables
        db.run(TABLE_ONE);
        db.run(TABLE_TWO);
        db.run(TABLE_THREE);
        db.run(TABLE_FOUR);
        db.run(TABLE_FIVE);

        // Insert data CATEGORIES
        db.run("INSERT INTO categories (categories_name, orders_id)" +
        "VALUES ('Kimono', 0);");
        db.run("INSERT INTO categories (categories_name, orders_id)" +
        "VALUES ('Homongi', 0);");
        db.run("INSERT INTO categories (categories_name, orders_id)" +
        "VALUES ('Yukata', 0);");

        // Insert data COUNTRIES
        db.run("INSERT INTO countries (countries_name) VALUES ('Japan');");
        db.run("INSERT INTO countries (countries_name) VALUES ('Korea');");
        db.run("INSERT INTO countries (countries_name) VALUES ('Thailand');");

        // Insert data ORDERS
        db.run("INSERT INTO orders (orders_name, orders_price, orders_desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Kimono Groen', '600', 'Best there is!', 0, 0, 0, 0);");
        db.run("INSERT INTO orders (orders_name, orders_price, orders_desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Homongi Blauw', '550', 'Best quality goods!', 0, 0, 0, 0);");
        db.run("INSERT INTO orders (orders_name, orders_price, orders_desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Yukata Paars', '750', 'The best of the best!', 0, 0, 0, 0);");

        // Insert data PRODUCTS
        db.run("INSERT INTO products (products_name, products_price, products_desc, categories_id)" +
        "VALUES ('Kimono Groen', '600', 'Een groene kimono', 0);");
        db.run("INSERT INTO products (products_name, products_price, products_desc, categories_id)" +
        "VALUES ('Homongi Blauw', '550', 'Een blauwe homongi', 0);");
        db.run("INSERT INTO products (products_name, products_price, products_desc, categories_id)" +
        "VALUES ('Yukata Paars', '750', 'Een paarse yukata', 0);");

        // Insert data USERS
        db.run("INSERT INTO users (users_name, orders_id, countries_id)" +
        "VALUES ('Tessa', 0, 0);");
        db.run("INSERT INTO users (users_name, orders_id, countries_id)" +
        "VALUES ('Philip', 0, 0);");
        db.run("INSERT INTO users (users_name, orders_id, countries_id)" +
        "VALUES ('Mirjam', 0, 0);");
    });
    
    // db.close(); 
    // db.on
    // db = GetDB();

    db.close(); 

    // SELECT - extracts data from a database
    // UPDATE - updates data in a database
    // DELETE - deletes data from a database
    // INSERT INTO - inserts new data into a database
    // CREATE DATABASE - creates a new database
    // ALTER DATABASE - modifies a database
    // CREATE TABLE - creates a new table
    // ALTER TABLE - modifies a table
    // DROP TABLE - deletes a table
    // CREATE INDEX - creates an index (search key)
    // DROP INDEX - deletes an index

  
    // INSERT INTO countries (countries_id, countries_name)
    // VALUES (countries_id, countries_name);
}

function DELETE_TABLES() {
    let db = GetDB();

    db.run('DROP TABLE IF EXISTS "categories";');
    db.run('DROP TABLE IF EXISTS "countries";');
    db.run('DROP TABLE IF EXISTS "orders";');
    db.run('DROP TABLE IF EXISTS "products";');
    db.run('DROP TABLE IF EXISTS "users";');

    db.close();
}

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// module.exports.Dinges = TEST;
module.exports.CREATE_TABLES = CREATE_TABLES;
module.exports.DELETE_TABLES = DELETE_TABLES;
module.exports.GetDB = GetDB;