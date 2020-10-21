const express = require("express");
var cors = require("cors");

let bodyParser = require("body-parser");

const listingRoutes = require("./routes/listingRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const authenticationRoutes = require("./routes/authenticationRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.options("*", cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 8000);
app.set("env", process.env.NODE_ENV || "development");

app.get("/", function (req, res) {
  // res.redirect("/api/v1/auth/signup");
  res.send('welcome to the homepage');
});

app.use("/api/v1/listings", listingRoutes);

app.use("/api/v1/auth", authenticationRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.use("/api/v1/users", userRoutes);

module.exports = app;
