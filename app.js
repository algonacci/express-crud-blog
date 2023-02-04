const path = require("path");
const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "php-crud-blog",
});

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "./public");

app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM posts ORDER BY created_at DESC",
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.render("index.ejs", { posts: results });
    }
  );
});

module.exports = app;
