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
    hostID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hostID",
    },
    pricePerDay: {
      type: DataTypes.INTEGER(11),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pricePerDay",
    },
    miscCostPercentage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "miscCostPercentage",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address",
    },
    listingDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "listingDescription",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: null,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: "updatedAt",
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "avgRating",
    },
    cityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cityId",
      // references: {
      //   key: "id",
      //   model: "city_model",
      // },
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      field: "features",
      // references: {
      //   key: "id",
      //   model: "Features_model",
      // },
    },
  };
  const options = {
    tableName: "Listings",
  };
  const ListingsModel = sequelize.define("Listings_model", attributes, options);
  return ListingsModel;
};
