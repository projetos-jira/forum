const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const connection = new Sequelize(dbConfig);

try {
  connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

module.exports = connection;
