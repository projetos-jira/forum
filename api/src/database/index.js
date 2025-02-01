const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const Usuario = require("../model/User.js");
const Post = require("../model/Post.js");
const Comentario = require("../model/Comentario.js");
const PostCurtidas = require("../model/PostCurtidas.js");
const ComentarioCurtidas = require("../model/ComentarioCurtidas.js");

const connection = new Sequelize(dbConfig);

try {
  connection.authenticate();
} catch (err) {
  console.log(err);
}

Usuario.init(connection);
Post.init(connection);
Comentario.init(connection);
PostCurtidas.init(connection);
ComentarioCurtidas.init(connection);

Usuario.associate(connection.models);
Post.associate(connection.models);
Comentario.associate(connection.models);
PostCurtidas.associate(connection.models);
ComentarioCurtidas.associate(connection.models);

module.exports = connection;
