const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // your MySQL password
  database: "testdb"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Handle form
app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err) => {
    if (err) throw err;
    res.send("User saved!");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
