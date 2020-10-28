require("dotenv").config();
const aws = require("aws-sdk");

var AWS_S3_REGION = process.env.awsRegion;
var AWS_S3_SECRET = process.env.awsSecret;
var AWS_S3_KEY = process.env.awsKey;

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: AWS_S3_KEY,
  secretAccessKey: AWS_S3_SECRET,
  region: AWS_S3_REGION,
});
module.exports = new AWS.S3();
