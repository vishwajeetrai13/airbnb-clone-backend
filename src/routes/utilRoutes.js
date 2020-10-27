const express = require("express");
const controller = require("../controllers/utilController");

const router = express.Router();

// this will get the user info for the profile page for the current user
// passing the current user id as a query params

router.get("/country", controller.allCountry);

// the following is to edit the user info
router.get("/state/:id", controller.allState);

// the following is to create the user info
router.get("/city/:id", controller.allCities);

module.exports = router;
