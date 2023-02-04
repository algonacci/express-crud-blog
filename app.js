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

app.get("/post/:id", (req, res) => {
  connection.query(
    "SELECT * FROM posts WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.render("post.ejs", { post: results });
    }
  );
});

app.get("/add_post", (req, res) => {
  res.render("add_post.ejs");
});

app.post("/add_post", (req, res) => {
  title = req.body.title;
  author = req.body.author;
  body = req.body.body;

  connection.query(
    `
    INSERT INTO posts (title, author, body)
    VALUES (?, ?, ?)
    `,
    [title, author, body],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.redirect("/");
    }
  );
});

module.exports = app;
