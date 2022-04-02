var sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
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
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
    "orders_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;

const TABLE_TWO = `
CREATE TABLE "countries" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;
const TABLE_THREE = `
CREATE TABLE "orders" (
	"id"	INTEGER UNIQUE,
    "date"   TEXT,
    "paid"   INTEGER,
    "shipped"    INTEGER,
    "products_id"   INTEGER,
    FOREIGN KEY("products_id") REFERENCES "products"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
    );
    `;
    
    // FOREIGN KEY("order_lines_id") REFERENCES "order_lines"("id"),
	// "products_id"	INTEGER NOT NULL,
	// "users_id"	INTEGER NOT NULL,
	// "countries_id"	INTEGER NOT NULL,
	// "categories_id"	INTEGER NOT NULL,
	// FOREIGN KEY("products_id") REFERENCES "products"("id"),
	// FOREIGN KEY("countries_id") REFERENCES "countries"("id"),
	// FOREIGN KEY("users_id") REFERENCES "users"("id"),
	// FOREIGN KEY("categories_id") REFERENCES "categories"("id"),

const TABLE_FOUR = `
CREATE TABLE "products" (
	"id"	INTEGER NOT NULL UNIQUE,
    "code" TEXT NOT NULL, 
	"title"	TEXT NOT NULL,
	"price"	INTEGER NOT NULL,
    "stock"    INTEGER NOT NULL,
	"desc"	TEXT,
	"categories_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;
const TABLE_FIVE = `
CREATE TABLE "users" (
	"id"	INTEGER NOT NULL UNIQUE,
    "email" TEXT NOT NULL,
	"firstname"	TEXT NOT NULL,
    "infix" TEXT,
    "lastname"    TEXT NOT NULL,
    "city"  TEXT NOT NULL,
    "zipcode"   TEXT NOT NULL,
    "street"    TEXT NOT NULL,
    "housenumber"   TEXT NOT NULL,
    "newsletter"    INTEGER NOT NULL,
    "password"   VARCHAR(250) NOT NULL,
    "userrole_id"   INTEGER NOT NULL,
	"countries_id"	INTEGER NOT NULL,
    FOREIGN KEY("userrole_id") REFERENCES "userrole"("id"),
	FOREIGN KEY("countries_id") REFERENCES "countries"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
    );
    `;

const TABLE_SIX = `
CREATE TABLE "user_order_relations" (
    "id"	INTEGER NOT NULL UNIQUE,
    "users_id"	INTEGER NOT NULL,
    "orders_id"	INTEGER NOT NULL,
    FOREIGN KEY("users_id") REFERENCES "users"("id"),
    FOREIGN KEY("orders_id") REFERENCES "orders"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
);
`;

const TABLE_SEVEN = `
CREATE TABLE "product_order_relations" (
    "id"	INTEGER NOT NULL UNIQUE,
    "products_id"	INTEGER NOT NULL,
    "orders_id"	INTEGER NOT NULL,
    FOREIGN KEY("products_id") REFERENCES "products"("id"),
    FOREIGN KEY("orders_id") REFERENCES "orders"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
);
`;

const TABLE_EIGHT = `
CREATE TABLE "authentication" (
    "id"	INTEGER NOT NULL UNIQUE,
);
`;

const TABLE_NINE = `
CREATE TABLE "userrole" (
    "id"    INTEGER NOT NULL UNIQUE,
    "name"  TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
)
`;

const TABLE_TEN = `
CREATE TABLE "order_lines" (
    "id"    INTEGER NOT NULL UNIQUE,
    "amount"    INTEGER NOT NULL,
    "total-price"   INTEGER NOT NULL,
    "orders_id" TEXT NOT NULL,
    "products_id"   TEXT NOT NULL,
    FOREIGN KEY("orders_id") REFERENCES "orders"("id"),
    FOREIGN KEY("products_id") REFERENCES "products"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
)
`;

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
        db.run('DROP TABLE IF EXISTS "user_order_relations";');
        db.run('DROP TABLE IF EXISTS "product_order_relations";');
        db.run('DROP TABLE IF EXISTS "authentication";');
        db.run('DROP TABLE IF EXISTS "userrole";');
        db.run('DROP TABLE IF EXISTS "order_lines";');

        // Create tables
        db.run(TABLE_ONE);
        db.run(TABLE_TWO);
        db.run(TABLE_THREE);
        db.run(TABLE_FOUR);
        db.run(TABLE_FIVE);
        db.run(TABLE_SIX);
        db.run(TABLE_SEVEN);
        // db.run(TABLE_EIGHT);
        db.run(TABLE_NINE);
        // db.run(TABLE_TEN);

        // Insert data CATEGORIES
        db.run("INSERT INTO categories (name)" +
        "VALUES ('Kimono');");
        db.run("INSERT INTO categories (name)" +
        "VALUES ('Homongi');");
        db.run("INSERT INTO categories (name)" +
        "VALUES ('Yukata');");
        db.run("INSERT INTO categories (name)" +
        "VALUES ('Schoenen');");

        // Insert data COUNTRIES
        db.run("INSERT INTO countries (name) VALUES ('Japan');");
        db.run("INSERT INTO countries (name) VALUES ('Korea');");
        db.run("INSERT INTO countries (name) VALUES ('Thailand');");

        // Insert data ORDERS
        db.run("INSERT INTO orders (id, date, paid, shipped, products_id)" +
        "VALUES (1, '09/02/2022', 1, 2, 0);");
        db.run("INSERT INTO orders (id, date, paid, shipped, products_id)" +
        "VALUES (2, '17/03/2022', 1, 1, 0);");
        db.run("INSERT INTO orders (id, date, paid, shipped, products_id)" +
        "VALUES (3, '22/01/2022', 1, 3, 0);");

        // Insert data PRODUCTS
        db.run("INSERT INTO products (code, title, price, stock, desc, categories_id)" +
        "VALUES ('LB-01', 'Kimono Groen', '600', 7, 'Een groene kimono', 0);");
        db.run("INSERT INTO products (code, title, price, stock, desc, categories_id)" +
        "VALUES ('LB-02', 'Homongi Blauw', '550', 9, 'Een blauwe homongi', 1);");
        db.run("INSERT INTO products (code, title, price, stock, desc, categories_id)" +
        "VALUES ('LB-03', 'Yukata Paars', '750', 2, 'Een paarse yukata', 0);");

        // Insert data USERS
        db.run("INSERT INTO users (id, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, password, userrole_id, countries_id)" +
        "VALUES (1, 'windesheim@student.nl', 'Mirjam', 'van der', 'Steen', 'Lelystad', '8219 AA', 'Oudaen', '37', 1, '" + HashPassword("1") + "', 1, 0);");
        db.run("INSERT INTO users (id, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, password, userrole_id, countries_id)" +
        "VALUES (2, 'windesheim@docent.nl', 'Philip', '', 'Thuijs', 'Almere', '1919 AB', 'Almerestraat', '2', 1, '" + HashPassword("1") + "', 2, 0);");
        db.run("INSERT INTO users (id, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, password, userrole_id, countries_id)" +
        "VALUES (3, 'windesheimzwolle@student.nl', 'Tessa', 'van der', 'Steen', 'Lelystad', '8219 AA', 'Oudaen', '37', 1,'" + HashPassword("2") + "', 3, 0);");

        // Insert data user_order_relations
        db.run("INSERT INTO user_order_relations (users_id, orders_id)" +
        "VALUES (0, 0);");
        db.run("INSERT INTO user_order_relations (users_id, orders_id)" +
        "VALUES (0, 0);");
        db.run("INSERT INTO user_order_relations (users_id, orders_id)" +
        "VALUES (0, 0);");

        // Insert data product_order_relations
        db.run("INSERT INTO product_order_relations (products_id, orders_id)" +
        "VALUES (0, 0);");
        db.run("INSERT INTO product_order_relations (products_id, orders_id)" +
        "VALUES (0, 0);");
        db.run("INSERT INTO product_order_relations (products_id, orders_id)" +
        "VALUES (0, 0);");
        
        // Insert data userrole
        db.run("INSERT INTO userrole (id, name)" +
        "VALUES (0, 0);");

        // Insert data order_lines
        // db.run("INSERT INTO order_lines (amount, total-price, id)" +
        // "VALUES (0, 0, 0)");
    });
    db.close(); 
}

function DELETE_TABLES() {
    let db = GetDB();

    db.run('DROP TABLE IF EXISTS "categories";');
    db.run('DROP TABLE IF EXISTS "countries";');
    db.run('DROP TABLE IF EXISTS "orders";');
    db.run('DROP TABLE IF EXISTS "products";');
    db.run('DROP TABLE IF EXISTS "users";');
    db.run('DROP TABLE IF EXISTS "user_order_relation";');
    db.run('DROP TABLE IF EXISTS "product_order_relations";');
    db.run('DROP TABLE IF EXISTS "authentication";');
    db.run('DROP TABLE IF EXISTS "userrole";');
    // db.run('DROP TABLE IF EXISTS "order_lines";');

    db.close();
}

function HashPassword(password){
    return bcrypt.hashSync(password, 10);
}

module.exports.CREATE_TABLES = CREATE_TABLES;
module.exports.DELETE_TABLES = DELETE_TABLES;
module.exports.GetDB = GetDB;
module.exports.HashPassword = HashPassword;