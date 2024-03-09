const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const db = require("../data/database");

const router = express.Router();

	@@ -10,7 +10,7 @@ router.get("/", function (req, res) {
});

router.get("/posts", async function (req, res) {
  const [posts] = await db.query(
    "SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id"
  );
  res.render("posts-list", { posts: posts });
	@@ -23,20 +23,20 @@ router.post("/posts", async function (req, res) {
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title,summary,body,author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.get("/posts/:id", async function (req, res) {
  const [posts] = await db.query(
    "SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts INNER JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
    [req.params.id]
  );
	@@ -60,7 +60,7 @@ router.get("/posts/:id", async function (req, res) {
});

router.get("/posts/:id/edit", async function (req, res) {
  const [posts] = await db.query("SELECT * FROM posts WHERE posts.id = ?", [
    req.params.id,
  ]);

	@@ -79,7 +79,7 @@ router.post("/posts/:id/edit", async function (req, res) {
    req.params.id,
  ];

  await db.query(
    "UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?",
    data
  );
	@@ -88,7 +88,7 @@ router.post("/posts/:id/edit", async function (req, res) {
});

router.post("/posts/:id/delete", async function (req, res) {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);

  res.redirect("/posts");
});
