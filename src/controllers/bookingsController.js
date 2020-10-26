// import model
const { date } = require("joi");
const db = require("../model/indexModel");
const bookingLibs = require("../libs/bookingLib");
// json input format
// {
//   "userId":"1",
//   "listingId":"10",
//   "checkinDate":"2020-08-8",
//   "checkoutDate":"2020-08-10",
//   "totalCost":"5000"
// }

const create = async (req, res) => {
  try {
    const data = req.body;
    if (await bookingLibs.isListingBook(data)) {
      return res.status(400).send("listing already booked");
    }
    const totalCost = await bookingLibs.calculateTotalCost(data);
    if (totalCost < 100) {
      res.status(400).send({ err: "invalid dates" });
    }
    const bookingData = await db.booking.build({ ...data, totalCost }).save();
    res.status(200).send(bookingData);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

module.exports = { create };
