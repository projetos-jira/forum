const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Usuario",
        tableName: "usuarios",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "user_id", as: "posts" });
  }
}

module.exports = Usuario;
