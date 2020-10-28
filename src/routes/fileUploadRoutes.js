const express = require("express");
const router = express.Router();
const controller = require("../controllers/fileUploadController");

router.post("/profile", controller.avatarUpload);
router.post("/listing", controller.listingImgUpload);

module.exports = router;
