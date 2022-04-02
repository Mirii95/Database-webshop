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
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"price"	NUMERIC NOT NULL,
	"desc"	TEXT,
	"products_id"	INTEGER NOT NULL,
	"users_id"	INTEGER NOT NULL,
	"countries_id"	INTEGER NOT NULL,
	"categories_id"	INTEGER NOT NULL,
	FOREIGN KEY("products_id") REFERENCES "products"("id"),
	FOREIGN KEY("countries_id") REFERENCES "countries"("id"),
	FOREIGN KEY("users_id") REFERENCES "users"("id"),
	FOREIGN KEY("categories_id") REFERENCES "categories"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;
const TABLE_FOUR = `
CREATE TABLE "products" (
	"id"	INTEGER NOT NULL UNIQUE,
    "code" TEXT NOT NULL, 
	"name"	TEXT NOT NULL,
	"price"	NUMERIC NOT NULL,
    "stock"    NUMERIC NOT NULL,
	"desc"	TEXT,
	"categories_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;
const TABLE_FIVE = `
CREATE TABLE "users" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
    "password"   VARCHAR(250) NOT NULL,
	"orders_id"	INTEGER NOT NULL,
	"countries_id"	INTEGER NOT NULL,
	FOREIGN KEY("countries_id") REFERENCES "countries"("id"),
	FOREIGN KEY("orders_id") REFERENCES "orders"("id"),
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

        // Create tables
        db.run(TABLE_ONE);
        db.run(TABLE_TWO);
        db.run(TABLE_THREE);
        db.run(TABLE_FOUR);
        db.run(TABLE_FIVE);
        db.run(TABLE_SIX);
        db.run(TABLE_SEVEN);
        // db.run(TABLE_EIGHT);

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
        db.run("INSERT INTO orders (name, price, desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Kimono Groen', '600', 'Best there is!', 0, 0, 0, 0);");
        db.run("INSERT INTO orders (name, price, desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Homongi Blauw', '550', 'Best quality goods!', 0, 0, 0, 0);");
        db.run("INSERT INTO orders (name, price, desc, products_id, users_id, countries_id, categories_id)" +
        "VALUES ('Yukata Paars', '750', 'The best of the best!', 0, 0, 0, 0);");

        // Insert data PRODUCTS
        db.run("INSERT INTO products (code, name, price, stock, desc, categories_id)" +
        "VALUES ('LB-01', 'Kimono Groen', '600', 7, 'Een groene kimono', 0);");
        db.run("INSERT INTO products (code, name, price, stock, desc, categories_id)" +
        "VALUES ('LB-02', 'Homongi Blauw', '550', 9, 'Een blauwe homongi', 1);");
        db.run("INSERT INTO products (code, name, price, stock, desc, categories_id)" +
        "VALUES ('LB-03', 'Yukata Paars', '750', 2, 'Een paarse yukata', 0);");

        // Insert data USERS
        db.run("INSERT INTO users (name, password, orders_id, countries_id)" +
        "VALUES ('Tessa', '" + HashPassword("1") + "', 0, 0);");
        db.run("INSERT INTO users (name, password, orders_id, countries_id)" +
        "VALUES ('Philip', '" + HashPassword("1") + "', 0, 0);");
        db.run("INSERT INTO users (name, password, orders_id, countries_id)" +
        "VALUES ('Mirjam', '" + HashPassword("2") + "', 0, 0);");
        
        
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

    db.close();
}

function HashPassword(password){
    return bcrypt.hashSync(password, 10);
}

module.exports.CREATE_TABLES = CREATE_TABLES;
module.exports.DELETE_TABLES = DELETE_TABLES;
module.exports.GetDB = GetDB;
module.exports.HashPassword = HashPassword;