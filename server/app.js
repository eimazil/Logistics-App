const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "logistics_database",
});

////////////////////LOGIN/////////////////

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/server")) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf("/login-check") ||
    0 === req.url.indexOf("/login") ||
    0 === req.url.indexOf("/register") ||
    0 === req.url.indexOf("/") ||
    0 === req.url.indexOf("/createFundraise")
  ) {
    next();
  } else {
    // fron
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if ("admin" === req.query.role) {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.get("/login/:session", (req, res) => {
  const sql = `
         SELECT id
         FROM users
         WHERE session = ?
    `;
  con.query(sql, [req.params.session], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const sql = `
    INSERT INTO users (name, psw)
    VALUES (?, ?)
  `;
  con.query(sql, [req.body.name, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////END////////////////////

// CONTAINERS
// CREATE
app.post("/admin/containers", (req, res) => {
  const sql = `
    INSERT INTO containers ( title, left_capacity, capacity)
    VALUES (?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.title, req.body.left_capacity, req.body.capacity],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/admin/containers", (req, res) => {
  const sql = `
    SELECT *
    FROM containers
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/admin/containers/:id", (req, res) => {
  const sql = `
    DELETE FROM containers
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CONTAINER OCCUPATION CHANGES

app.put("/admin/boxCreate/:id", (req, res) => {
  const sql = `
    UPDATE containers
    SET
    ocupation = ocupation + 1,
    left_capacity = capacity - ocupation
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/boxDelete/:id", (req, res) => {
  const sql = `
    UPDATE containers
    SET
    ocupation = ocupation - 1,
    left_capacity = capacity - ocupation
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/boxChangeAdd/:id", (req, res) => {
  const sql = `
    UPDATE containers
    SET
    ocupation = ocupation + 1,
    left_capacity = capacity - ocupation
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/boxChangeRemove/:id", (req, res) => {
  const sql = `
    UPDATE containers
    SET
    ocupation = ocupation - 1,
    left_capacity = capacity - ocupation
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// BOXES

app.post("/admin/boxes", (req, res) => {
  const sql = `
    INSERT INTO boxes (title, flammability, perishable, image, container_id)
    VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.flammability,
      req.body.perishable,
      req.body.image,
      req.body.container_id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/admin/boxes", (req, res) => {
  const sql = `
    SELECT *
    FROM boxes
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/admin/boxes/:id", (req, res) => {
  const sql = `
    DELETE FROM boxes
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/boxes/:id", (req, res) => {
  let sql;
  let r;
  if (req.body.deletePhoto) {
    sql = `
        UPDATE boxes
        SET title = ?, flammability = ?, perishable = ?, container_id = ?, image = null
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.flammability,
      req.body.perishable,
      req.body.container_id,
      req.params.id,
    ];
  } else if (req.body.image) {
    sql = `
        UPDATE boxes
        SET title = ?, flammability = ?, perishable = ?, container_id = ?, image = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.flammability,
      req.body.perishable,
      req.body.container_id,
      req.body.image,
      req.params.id,
    ];
  } else {
    sql = `
        UPDATE boxes
        SET title = ?, flammability = ?, perishable = ?, container_id = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.flammability,
      req.body.perishable,
      req.body.container_id,
      req.params.id,
    ];
  }
  con.query(sql, r, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Home
app.get("/home/containers", (req, res) => {
  const sql = `
    SELECT c.*, b.title as box_title, b.id as box_id, b.flammability, b.perishable, b.image, b.container_id
    FROM containers AS c
    LEFT JOIN boxes AS b
    ON c.id = b.container_id
    ORDER BY c.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Rūbų parduotuvė dirba per ${port} portą!`);
});
