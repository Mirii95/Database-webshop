const express = require("express");
const database = require("../database/connection.js");
const router = express.Router();
const bcrypt = require("bcrypt");
/**
 * @swagger
 * components:
 *  schemas:
 *   Users:
 *    type: object
 *    required:
 *     - id
 *     - password
 *     - email
 *     - firstname
 *     - infix
 *     - lastname
 *     - city
 *     - zipcode
 *     - street
 *     - housenumber
 *     - newsletter
 *    properties:
 *     id:
 *      type: integer
 *      description: De id van users.
 *     password:
 *      type: string
 *      description: Het wachtwoord van users.
 *     email:
 *      type: string
 *      description: De email van users.
 *     firstname:
 *      type: string
 *      description: De eerste naam van users.
 *     infix:
 *      type: string
 *      description: De infix van users.
 *     lastname:
 *      type: string
 *      description: De laatste naam van users.
 *     city:
 *      type: string
 *      description: De stad van users.
 *     zipcode:
 *      type: string
 *      description: De zipcode van users.
 *     street:
 *      type: string
 *      description: De straat van users.
 *     housenumber:
 *      type: string
 *      description: De huisnummer van users.
 *     newsletter:
 *      type: integer
 *      description: De newsletter van users.
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *   tags: [Users]
 *   description: Haalt alle users op waaraan een Product gekoppeld kan zijn.
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Users'
 */

// GET ALLES
router.get("/", function (req, res) {
  let db = database.GetDB();
  let results = { users: [] };

  if (!req.userAdmin) {
    res.status(403).json({ message: "You are not authorised to get!" });
    return;
  }

  db.all(
    // "SELECT id, name FROM Users",
    "SELECT id, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, userrole_id, countries_id FROM Users",
    function (err, rows) {
      results["users"] = rows;
      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *   tags: [Users]
 *   description: Haalt 1 user op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Users'
 */

// GET :ID
router.get("/:id", function (req, res) {
  const id = req.params.id;
  let db = database.GetDB();
  let results = [];

  db.get(
    "SELECT id, firstname FROM Users WHERE id=" + id + ";",
    function (err, rows) {
      results.push(rows);
      res.json(results);
    }
  );
  db.close();
});

// router.get('/me', function (req, res) {
//   const id = req.params.id;
//   let db = database.GetDB();
//   let results = [];

//   if (!req.userTemp){
//     res.status(403).json({ message: "You are not authorised to get!"});
//     return;
//   }

//   db.get("SELECT ... FROM ... WHERE ..." + id + ";", function(err, rows) {
//       results.push(rows);
//       res.json(results);
//   });
//   db.close();
// });

/**
 * @swagger
 * /api/users/{id}/orders:
 *  get:
 *   tags: [Users]
 *   description: Haalt 1 User op waaraan een Product gekoppeld kan zijn.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users van de webshop.
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        type:
 *         object
 *        properties:
 *         categories:
 *          type:
 *           array
 *          items:
 *           $ref: '#/components/schemas/Orders'
 */

// router.get("/:id/orders", function (req, res) {
//   const id = req.params.id;
//   let db = database.GetDB();
//   let results = [];

//   if (!req.userTemp){
//     res.status(403).json({ message: "You are not authorised to get!"});
//     return;
//   }

// db.all(
//     "SELECT * FROM Orders WHERE id=" + id + ";",
//     function (err, rows) {
//         results.push(rows);
//         res.json(results);
// });
// db.close();
// });

//GET :ID/ORDERS
router.get("/:id/orders", function (req, res) {
  const id = req.params.id;
  // const id = 1;
  let db = database.GetDB();
  let results = { orders: [] };

  db.all(
    "Select * from orders " +
      "left join order_lines ON orders.id=order_lines.orders_id " +
      "left join products ON order_lines.products_id=products.id " +
      "left join users ON orders.users_id=users.id " +
      "where orders.users_id=" +
      id +
      ";",
    function (err, rows) {
      let DifferentOrders = {};
      let count = 0;
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        if (element["orders_id"] in DifferentOrders) {
          // This already exists here:
        } else {
          DifferentOrders[element["orders_id"]] = count;
          results["orders"][count] = {};
          results["orders"][count]["order_lines"] = [];
          count++;
        }
      }

      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        let order_index = DifferentOrders[element["orders_id"]];

        results["orders"][order_index]["id"] = element["orders_id"];
        results["orders"][order_index]["date"] = element["date"];
        results["orders"][order_index]["paid"] = element["paid"];
        results["orders"][order_index]["shipped"] = element["shipped"];

        let l = results["orders"][order_index]["order_lines"].length;

        results["orders"][order_index]["order_lines"][l] = {};
        results["orders"][order_index]["order_lines"][l]["amount"] =
          element["amount"];
        results["orders"][order_index]["order_lines"][l]["total_price"] =
          element["amount"] * element["aankoop_price"];
        results["orders"][order_index]["order_lines"][l]["product"] = {};
        results["orders"][order_index]["order_lines"][l]["product"]["title"] =
          element["title"];

        let userDict = {
          id: element["users_id"],
          firstname: element["firstname"],
          infix: element["infix"],
          lastname: element["lastname"],
        };
        results["orders"][order_index]["user"] = userDict;
      }

      res.json(results);
    }
  );
  db.close();
});

/**
 * @swagger
 * /api/users:
 *  post:
 *   tags: [Users]
 *   description: Gegevens naar een server verzenden om een bron aan te maken of bij te werken.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Users'
 *
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 */

router.post("/", function (req, res) {
  const NewStreet = req.body.street;
  const NewCity = req.body.city;
  const NewFirstName = req.body.firstname;
  const NewLastName = req.body.lastname;
  const password = req.body.password;
  const NewEmail = req.body.email;
  const zipcode = req.body.zipcode;
  let db = database.GetDB();

  if (!NewFirstName) {
    res.status(400).json({ message: "Null or empty" });
    return;
  }
  if (NewStreet.length < 2) {
    res
      .status(400)
      .json({ message: "Street name has to be at least 2 characters long!" });
    return;
  }
  if (NewCity.length < 2) {
    res
      .status(400)
      .json({ message: "City name has to be at least 2 characters long!" });
    return;
  }
  if (NewFirstName.length < 2) {
    res
      .status(400)
      .json({ message: "Firstname has to be at least 2 characters long!" });
    return;
  }
  if (NewLastName.length < 2) {
    res
      .status(400)
      .json({ message: "Lastname has to be at least 2 characters long!" });
    return;
  }

  // https://stackoverflow.com/questions/7684815/regex-pattern-to-match-at-least-1-number-and-1-character-in-a-string
  if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
    res
      .status(403)
      .json({ message: "Use letters and numbers for your password!" });
    return;
  }
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (
    !NewEmail.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
  ) {
    res.status(403).json({ message: "Email not correct!" });
    return;
  }
  //murani.nl/blog/2015-09-28/nederlandse-reguliere-expressies/
  if (!zipcode.match(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)) {
    res.status(403).json({ message: "Zipcode failed!" });
    return;
  }

  db.all(
    // "SELECT id, name FROM Users",
    "SELECT email FROM Users",
    function (err, rows) {
      console.info(rows);
      let emailAllInUse = false;
      for (let index = 0; index < rows.length; index++) {
        const email = rows[index]["email"];
        if (email == NewEmail) {
          emailAllInUse = true;
        }
      }
      if (emailAllInUse) {
        res.status(400).json({ message: "Email already in use!" });
      } else {
        // Email not in use
        db.run(
          "INSERT INTO Users (password, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, userrole_id, countries_id)" +
            "VALUES ('" +
            database.HashPassword(password) +
            "', '" +
            NewEmail +
            "', '" +
            NewFirstName +
            "', 'infix', '" +
            NewLastName +
            "', '" +
            NewCity +
            "', 'zipcode', '" +
            NewStreet +
            "', 'housenumber', 0, 0, 0);"
        );

        res.status(200).json({ message: "Succes!" });
      }
    }
  );
  db.close();
});

module.exports = router;

/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *   tags: [Users]
 *   description: Om bestaande rijen in een tabel bij te werken.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Users'
 *
 *   responses:
 *    200:
 *     description: Json met de users.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 */

// PATCH
router.patch("/:id", function (req, res) {
  const NewEmail = req.body.email;
  const NewFirstName = req.body.firstname;
  const NewInfix = req.body.infix;
  const NewLastName = req.body.lastname;
  const NewCity = req.body.city;
  const NewZipCode = req.body.zipcode;
  const NewStreet = req.body.street;
  const NewHouseNumber = req.body.housenumber;
  const NewNewsLetter = req.body.newsletter;
  const password = req.body.password;
  
  const id = req.params.id;
  const body = req.body;
  let passwordChange = false;
  // if (NewFirstName != undefined && !NewFirstName) {
  //   res.status(400).json({ message: "Firstname null or empty" });
  //   return;
  // }
  // if (NewInfix != undefined && !NewInfix) {
  //   res
  //     .status(400)
  //     .json({ message: "Infix null or empty" });
  //   return;
  // }
  // if (NewLastName != undefined && !NewFirstName) {
  //   res
  //     .status(400)
  //     .json({ message: "Lastname null or empty" });
  //   return;
  // }
  // if (NewCity != undefined && !NewCity) {
  //   res
  //     .status(400)
  //     .json({ message: "City null or empty" });
  //   return;
  // }
  // if (NewZipCode != undefined && !NewZipCode) {
  //   res
  //     .status(400)
  //     .json({ message: "Zipcode null or empty" });
  //   return;
  // }
  // if (NewStreet != undefined && !NewStreet) {
  //   res
  //     .status(400)
  //     .json({ message: "Streetname null or empty" });
  //   return;
  // }
  // if (NewHouseNumber != undefined && !NewHouseNumber) {
  //   res
  //     .status(400)
  //     .json({ message: "Housenumber null or empty" });
  //   return;
  // }

  // if (NewNewsLetter != undefined) {
  //   if (!NewNewsLetter) {
  //     res
  //       .status(400)
  //       .json({ message: "Newsletter null or empty" });
  //     return;
  //   }
  // }
  
  if (password != undefined) {
    // https://stackoverflow.com/questions/7684815/regex-pattern-to-match-at-least-1-number-and-1-character-in-a-string
    if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
      res
        .status(403)
        .json({ message: "Use letters and numbers for your password!" });
      return;
    }
    passwordChange = true;
  }
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

  if (NewEmail != undefined) {
    if (!NewEmail.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      res.status(403).json({ message: "Email not correct!" });
      return;
    }
  }  
  
  if (NewZipCode != undefined) {
    //murani.nl/blog/2015-09-28/nederlandse-reguliere-expressies/
    if (!NewZipCode.match(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)) {
      res.status(403).json({ message: "Zipcode failed!" });
      return;
    }
  }



  let db = database.GetDB();
  
  db.get(
    // "SELECT id, name FROM Users",
    "SELECT id, email, firstname, infix, lastname, city, zipcode, street, housenumber, newsletter, countries_id FROM Users WHERE id=" + id + ";",
    function (FirstErr, firstRow) {

      firstRow["email"]; 

      for (const key in body) {
        firstRow[key] = body[key];
      }
      if (passwordChange) {
        db.run(
          "UPDATE Users SET "+
          "email = '"       + firstRow["email"] + "', "+
          "password = '"    + database.HashPassword(firstRow["password"]) + "', "+
          "firstname = '"   + firstRow["firstname"] + "', "+
          "infix = '"       + firstRow["infix"] + "', "+
          "lastname = '"    + firstRow["lastname"] + "', "+
          "city = '"        + firstRow["city"] + "', "+
          "zipcode = '"     + firstRow["zipcode"] + "', "+
          "street = '"      + firstRow["street"] + "', "+
          "housenumber = '" + firstRow["housenumber"] + "', "+
          "newsletter = "   + firstRow["newsletter"] + ", "+
          "countries_id = " + firstRow["countries_id"] + " "+
          "WHERE id = " + id + ";"
        );
      } else {
        db.run(
          "UPDATE Users SET "+
          "email = '"       + firstRow["email"] + "', "+
          "firstname = '"   + firstRow["firstname"] + "', "+
          "infix = '"       + firstRow["infix"] + "', "+
          "lastname = '"    + firstRow["lastname"] + "', "+
          "city = '"        + firstRow["city"] + "', "+
          "zipcode = '"     + firstRow["zipcode"] + "', "+
          "street = '"      + firstRow["street"] + "', "+
          "housenumber = '" + firstRow["housenumber"] + "', "+
          "newsletter = "   + firstRow["newsletter"] + ", "+
          "countries_id = " + firstRow["countries_id"] + " "+
          "WHERE id = " + id + ";"
        );
      }

        

      res.status(200).json({ message: "Succes!" });


    }
  );

  // email: 'windesheim@student.nl',
  // firstname: 'Mirjam',
  // infix: 'van der',
  // lastname: 'Steen',
  // city: 'Lelystad',
  // zipcode: '8219 AA',
  // street: 'Oudaen',
  // housenumber: '37',
  // newsletter: 1,
  // userrole_id: 1,
  // countries_id: 0
  
  // db.run(
  //   "UPDATE Users SET firstname = '" + NewFirstName + "' WHERE id = " + id + ";"
  // );
  // res.status(200).json({ message: "Changed!" });
  db.close();
});

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *   tags: [Users]
 *   description: Verwijdert gegevens uit een tabel.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: users_id
 *
 *   responses:
 *    200:
 *     description: Succesvol verwijdert.
 */

// DELETE
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db = database.GetDB();

  db.run("DELETE FROM Users WHERE id = " + id + ";");
  res.status(200).json({ message: "Deleted!" });
  db.close();
});
