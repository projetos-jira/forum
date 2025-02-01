const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        apelido: DataTypes.STRING,
        profissao: DataTypes.STRING,
        avatar: DataTypes.BLOB("long"),
      },
      {
        sequelize,
        modelName: "Usuario",
        tableName: "Users",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "user_id", as: "Posts" });
    this.hasMany(models.Comentario, {
      foreignKey: "user_id",
      as: "Comentarios",
    });
  }
}

module.exports = User;
