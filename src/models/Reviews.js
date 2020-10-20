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
        model: "Booking"
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

  const ReviewsModel = sequelize.define("Reviews", attributes,);
  return ReviewsModel;
};