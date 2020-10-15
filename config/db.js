require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);
