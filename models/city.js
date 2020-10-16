const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    cityName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cityName"
    },
    stateId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stateId",
      references: {
        key: "id",
        model: "state_model"
      }
    }
  };
  const options = {
    tableName: "city",
    comment: "",
    indexes: [{
      name: "city_fk0",
      unique: false,
      type: "BTREE",
      fields: ["stateId"]
    }]
  };
  const CityModel = sequelize.define("city_model", attributes, options);
  return CityModel;
};