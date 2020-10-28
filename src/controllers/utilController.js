const db = require("../model/indexModel");
const s3 = require("../config/configS3Aws");
const uuid = require("uuid");

const allCountry = async (req, res) => {
  try {
    const allCountyName = await db.country.findAll({
      raw: true,
    });
    res.status(200).send(allCountyName);
  } catch (err) {
    return res.status(400).send({ err: err });
  }
};

const allState = async (req, res) => {
  try {
    const countryId = parseInt(req.params["id"]);
    const allStateName = await db.state.findAll({
      raw: true,
      where: {
        countryId: countryId,
      },
    });
    res.status(200).send(allStateName);
  } catch (err) {
    return res.status(400).send({ err: err });
  }
};

const allCities = async (req, res) => {
  try {
    const stateId = parseInt(req.params["id"]);
    const allCityName = await db.city.findAll({
      raw: true,
      where: {
        stateId: stateId,
      },
    });
    res.status(200).send(allCityName);
  } catch (err) {
    return res.status(400).send({ err: err });
  }
};

const getSignedURL = (req, res, next) => {
  let params = {
    Bucket: process.env.awsBucketName,
    Key: uuid.v4(),
    Expires: 60 * 4,
    ContentType: "image/jpeg",
  };
  s3.getSignedUrl("putObject", params, function (err, signedUrl) {
    if (err) {
      console.log({ err });
      return next(err);
    }
    return res.status(200).send({
      postUrl: signedUrl,
      getUrl: signedUrl.split("?")[0],
    });
  });
};

module.exports = { allCountry, allState, allCities, getSignedURL };
