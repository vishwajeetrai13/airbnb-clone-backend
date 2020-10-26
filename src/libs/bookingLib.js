const db = require("../model/indexModel");

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

const dateDifference = (currDate, newDate) => {
  let initialDate = new Date(currDate);
  let finalDate = new Date(newDate);
  let differenceInTime = finalDate.getTime() - initialDate.getTime();
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};

const calculateTotalCost = async (data) => {
  const listingDetail = await db.listing.findOne({
    raw: true,
    where: {
      id: data.listingId,
    },
  });
  let totalDayStay = dateDifference(data.checkinDate, data.checkoutDate);
  return null, totalDayStay * listingDetail.pricePerDay;
};

module.exports = { isListingBook, calculateTotalCost };
