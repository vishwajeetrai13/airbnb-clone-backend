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
    hostID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hostID",
      references: {
        key: "id",
        model: "Users_model"
      }
    },
    pricePerDay: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pricePerDay"
    },
    miscCostPercentage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "miscCostPercentage"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address"
    },
    listingDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "listingDescription"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt"
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "avgRating"
    },
    cityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cityId",
      references: {
        key: "id",
        model: "city_model"
      }
    },
    features: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "features",
      references: {
        key: "id",
        model: "Features_model"
      }
    }
  };
  const options = {
    tableName: "Listings",
    comment: "",
    indexes: [{
      name: "Listings_fk0",
      unique: false,
      type: "BTREE",
      fields: ["hostID"]
    }, {
      name: "Listings_fk1",
      unique: false,
      type: "BTREE",
      fields: ["cityId"]
    }, {
      name: "Listings_fk2",
      unique: false,
      type: "BTREE",
      fields: ["features"]
    }]
  };
  const ListingsModel = sequelize.define("Listings_model", attributes, options);
  return ListingsModel;
};