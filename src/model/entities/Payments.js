const { DataTypes, NOW } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id",
    },
    bookingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bookingId",
    },
    TransactionID: {
      type: DataTypes.STRING(255),
      allowNull: false,

      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TransactionID",
      unique: "TransactionID",
    },
    totalPaymentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "totalPaymentAmount",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      defaultValue: NOW,
      field: "createdAt",
    },
    PaymentStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "PaymentStatus",
    },
  };
  const options = {
    tableName: "Payments",
  };
  const PaymentsModel = sequelize.define("Payments_model", attributes, options);
  return PaymentsModel;
};
