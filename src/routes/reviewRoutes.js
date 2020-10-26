const express = require("express");
const controller = require("../controllers/reviewController");

const router = express.Router();

router.post("/", controller.reviewOfBooking);

module.exports = router;
