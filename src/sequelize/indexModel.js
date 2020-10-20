const sequelize = require("../config/configDb");
const Sequelize = require("sequelize");
const associate = require("./associateConfig");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/Users")(sequelize);
db.listing = require("./models/Listings")(sequelize);
db.listingImage = require("./models/Image")(sequelize);
db.bookmark = require("./models/Bookmark")(sequelize);
db.booking = require("./models/Booking")(sequelize);
db.city = require("./models/City")(sequelize);
db.state = require("./models/State")(sequelize);
db.country = require("./models/Country")(sequelize);
db.payment = require("./models/Payments")(sequelize);
db.review = require("./models/Reviews")(sequelize);

associate(db);

module.exports = db;
