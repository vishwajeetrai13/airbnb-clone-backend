const db = require("../model/indexModel");

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

module.exports = { allCountry, allState, allCities };
