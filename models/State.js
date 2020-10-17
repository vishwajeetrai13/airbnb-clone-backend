const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    stateName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stateName"
    },
    countryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "countryId",
      references: {
        key: "id",
        model: "country_model"
      }
    }
  };
  const options = {
    tableName: "state",
    comment: "",
    indexes: [{
      name: "state_fk0",
      unique: false,
      type: "BTREE",
      fields: ["countryId"]
    }]
  };
  const StateModel = sequelize.define("state_model", attributes, options);
  return StateModel;
};