const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id",
    },
    cityName: {
      type: DataTypes.STRING(255),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cityName",
    },
    stateId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stateId",
    },
  };
  const options = {
    tableName: "city",
  };
  const CityModel = sequelize.define("city_model", attributes, options);
  return CityModel;
};
