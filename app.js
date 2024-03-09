const path = require("path");
const express = require("express");
const blogRoutes = require("./routes/blog");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files (e.g. CSS files)

// Define route handler for the root URL
app.get("/", (req, res) => {
  res.redirect("/posts"); // Redirect to /posts
});

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.error(error);
  res.status(500).render("500");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
