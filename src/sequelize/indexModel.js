const sequelize = require("../config/configDb");
const Sequelize = require("sequelize");
const associate = require("./associateConfig");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/Users")(sequelize);
db.listing = require("./models/Listings")(sequelize);
db.listingImage = require("./models/Image")(sequelize);
// db.feature = require("./models/Features")(sequelize);

associate(db);

module.exports = db;
