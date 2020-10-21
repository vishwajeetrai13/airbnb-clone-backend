const sequelize = require("../config/configDb");
const Sequelize = require("sequelize");
const associate = require("./associateConfig");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./entities/Users")(sequelize);
db.listing = require("./entities/Listings")(sequelize);
db.listingImage = require("./entities/Image")(sequelize);
db.bookmark = require("./entities/Bookmark")(sequelize);
db.booking = require("./entities/Booking")(sequelize);
db.city = require("./entities/City")(sequelize);
db.state = require("./entities/State")(sequelize);
db.country = require("./entities/Country")(sequelize);
db.payment = require("./entities/Payments")(sequelize);
db.review = require("./entities/Reviews")(sequelize);

associate(db);

module.exports = db;
