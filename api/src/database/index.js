const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const Usuario = require("../model/Usuario.js");
const Post = require("../model/Post.js");

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Post.init(connection);

Usuario.associate(connection.models);
Post.associate(connection.models);

module.exports = connection;
