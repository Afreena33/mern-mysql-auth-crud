const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@Afr410eena",
  database: "mern_auth_db"
});

module.exports = db.promise();