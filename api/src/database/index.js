const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const Usuario = require("../model/Usuario.js");
const Post = require("../model/Post.js");
const Comentario = require("../model/Comentario.js");
const Curtidas = require("../model/Curtidas.js");

const connection = new Sequelize(dbConfig);

try {
  connection.authenticate();
} catch (err) {
  console.log(err);
}

Usuario.init(connection);
Post.init(connection);
Comentario.init(connection);
Curtidas.init(connection);

Usuario.associate(connection.models);
Post.associate(connection.models);
Comentario.associate(connection.models);
Curtidas.associate(connection.models);

module.exports = connection;
