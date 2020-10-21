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
    typeofListing: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "typeofListing",
    },
    bedrooms: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bedrooms",
    },
    bathrooms: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bathrooms",
    },
    beds: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "beds",
    },
    maxOccupants: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "maxOccupants",
    },
    policies: {
      type: DataTypes.JSON,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "policies",
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amenities",
    },
  };
  const options = {
    tableName: "Features",
  };
  const FeaturesModel = sequelize.define("Features_model", attributes, options);
  return FeaturesModel;
};
