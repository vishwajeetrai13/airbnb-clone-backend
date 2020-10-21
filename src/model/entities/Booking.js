const { DataTypes, NOW } = require("sequelize");

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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      // defaultValue: null,
      primaryKey: false,
      // autoIncrement: false,
      comment: null,
      field: "userId",
    },
    listingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      // defaultValue: null,
      primaryKey: false,
      // autoIncrement: false,
      comment: null,
      field: "listingId",
    },
    checkinDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "checkinDate",
    },
    checkoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "checkoutDate",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt",
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: DataTypes.FLOAT,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "totalCost",
    },
  };
  const options = {
    tableName: "Booking",
  };
  const BookingModel = sequelize.define("Booking_model", attributes, options);
  return BookingModel;
};
