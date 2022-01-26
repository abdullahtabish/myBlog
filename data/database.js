const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  database: "heroku_dc7870cc5f71c3c",
  user: "b03eb642afd46b",
  password: "a7f28eca",
});

module.exports = pool;
