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
    pool: {
      max: 10,
      min: 0,
      idle: 20000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 1000000,
    },
  }
);
