const { Model, DataTypes } = require("sequelize");

class ComentarioCurtidas extends Model {
  static init(sequelize) {
    super.init(
      {
        comentario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Comentarios",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "ComentarioCurtidas",
        tableName: "Comentarios_Curtidas",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Comentario, {
      foreignKey: "comentario_id",
      as: "Comentario",
    });
    this.belongsTo(models.Usuario, { foreignKey: "user_id", as: "Usuario" });
  }
  
}

module.exports = ComentarioCurtidas;
