const { Model, DataTypes } = require("sequelize");

class Curtidas extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        post_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Curtidas",
        tableName: "curtidas",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: "post_id", as: "post" });
  }
}

module.exports = Curtidas;
