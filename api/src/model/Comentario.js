const { Model, DataTypes } = require("sequelize");

class Comentario extends Model {
  static init(sequelize) {
    super.init(
      {
        conteudo: DataTypes.TEXT,
        qtd_curtidas: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        post_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Comentario",
        tableName: "Comentarios",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: "post_id", as: "Post" });
    this.belongsTo(models.Usuario, { foreignKey: "user_id", as: "Usuario" });
    this.hasMany(models.ComentarioCurtidas, {
      foreignKey: "comentario_id",
      as: "Curtidas",
    });
  }
}

module.exports = Comentario;
