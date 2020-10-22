// import model
const { isDate } = require("lodash");
const db = require("../model/indexModel");

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
    if (await isListingBook(data)) {
      res.status(400).send("listing already booked");
      return;
    }
    const bookingData = await db.booking.build(data).save();
    res.status(200).send(bookingData);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const isListingBook = async (data) => {
  const currentBookingDate = {
    checkinDate: new Date(data.checkinDate),
    checkoutDate: new Date(data.checkoutDate),
  };
  let isBooked = false;
  await db.booking
    .findAll({
      raw: true,
      attributes: ["checkinDate", "checkoutDate"],
      where: {
        listingId: data.listingId,
      },
    })
    .then((data) => {
      return data.find((result) => {
        const resultData = {
          checkinDate: new Date(result.checkinDate),
          checkoutDate: new Date(result.checkoutDate),
        };
        if (
          isDateInBetween(resultData, currentBookingDate) ||
          isDateInBetween(currentBookingDate, resultData)
        ) {
          isBooked = true;
          return;
        }
      });
    });
  return isBooked;
};

const isDateInBetween = (foo, bar) => {
  // console.log(foo, bar);
  if (
    foo.checkinDate <= bar.checkinDate &&
    bar.checkinDate <= foo.checkoutDate
  ) {
    console.log("checkin", foo, bar);
    console.log("\n\n");
    return true;
  } else if (
    foo.checkinDate <= bar.checkoutDate &&
    bar.checkoutDate <= foo.checkoutDate
  ) {
    console.log("checkout", foo, bar);
    console.log("\n\n");
    return true;
  }
  return false;
};

module.exports = { create };
