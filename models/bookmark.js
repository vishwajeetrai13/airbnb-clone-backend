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
    listingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "listingId",
      references: {
        key: "id",
        model: "Listings_model"
      }
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userId",
      references: {
        key: "id",
        model: "Users_model"
      }
    }
  };
  const options = {
    tableName: "bookmark",
    comment: "",
    indexes: [{
      name: "bookmark_fk0",
      unique: false,
      type: "BTREE",
      fields: ["listingId"]
    }, {
      name: "bookmark_fk1",
      unique: false,
      type: "BTREE",
      fields: ["userId"]
    }]
  };
  const BookmarkModel = sequelize.define("bookmark_model", attributes, options);
  return BookmarkModel;
};