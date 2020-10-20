const Sequelize = require("sequelize");

const sequelize = require("../src/config/configDb");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../src/models/Users")(sequelize);
db.feature = require("../src/models/Features")(sequelize);
db.country = require("../src/models/Country")(sequelize);
db.listing = require("../src/models/Listings")(sequelize);
db.listingImage = require("../src/models/Image")(sequelize);
db.state = require("../src/models/State")(sequelize);
db.bookmark = require("../src/models/Bookmark")(sequelize);
db.booking = require("../src/models/Booking")(sequelize);
db.review = require("../src/models/Reviews")(sequelize);
db.payment = require("../src/models/Payments")(sequelize);
db.city = require("../src/models/City")(sequelize);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(() => {
//   sequelize
//     .sync({ force: true })
//     .then(() => {
//       console.log("table created in memory");
//       // logic to Migrate/ dump data
//       // to the DB shall go here, this just created the table in the DB
//     })
//     .catch((error) => console.error(error));
// });

module.exports = db;
