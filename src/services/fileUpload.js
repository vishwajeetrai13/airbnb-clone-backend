const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const uuid = require("uuid");
const s3 = require("../config/configS3Aws");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.awsBucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      const fileExt = "." + file.mimetype.split("/")[1];
      cb(null, uuid.v4() + fileExt);
    },
  }),
  limits: { fileSize: 1000000 * 1 },
});

module.exports = upload;
