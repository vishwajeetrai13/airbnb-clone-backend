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
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    entityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "entityId",
      references: {
        key: "id",
        model: "Listings_model"
      }
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "url"
    },
    alt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alt"
    }
  };
  const options = {
    tableName: "Image",
    comment: "",
    indexes: [{
      name: "Image_fk0",
      unique: false,
      type: "BTREE",
      fields: ["entityId"]
    }]
  };
  const ImageModel = sequelize.define("Image_model", attributes, options);
  return ImageModel;
};