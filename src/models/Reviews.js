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
    bookingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bookingId",
      references: {
        key: "id",
        model: "Booking_model"
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    rating: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rating"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    byHost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "byHost"
    }
  };
  const options = {
    tableName: "Reviews",
    comment: "",
    indexes: [{
      name: "Reviews_fk0",
      unique: false,
      type: "BTREE",
      fields: ["bookingId"]
    }]
  };
  const ReviewsModel = sequelize.define("Reviews_model", attributes, options);
  return ReviewsModel;
};