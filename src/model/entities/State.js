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
    stateName: {
      type: DataTypes.STRING(255),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stateName",
    },
    countryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "countryId",
    },
  };
  const options = {
    tableName: "state",
  };
  const StateModel = sequelize.define("state_model", attributes, options);
  return StateModel;
};
