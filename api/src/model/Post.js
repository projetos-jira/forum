const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        conteudo: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: "user_id", as: "usuario" });
  }
}

module.exports = Post;
