const { Model, DataTypes } = require("sequelize");

class PostCurtidas extends Model {
  static init(sequelize) {
    super.init(
      {
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Posts",
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
        modelName: "PostCurtidas",
        tableName: "Posts_Curtidas",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: "post_id", as: "Post" });
    this.belongsTo(models.Usuario, { foreignKey: "user_id", as: "Usuario" });
  }
}

module.exports = PostCurtidas;
