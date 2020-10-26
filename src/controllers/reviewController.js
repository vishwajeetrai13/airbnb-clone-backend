const db = require("../model/indexModel");

const reviewOfBooking = async (req, res) => {
  try {
    const bookingId = parseInt(req.body.bookingId);
    const isBookingExist = await db.booking.findByPk(bookingId);
    if (!isBookingExist) {
      return res.status(400).send("booking not available");
    }
    const isReviewed = await db.review.findAll({
      where: {
        bookingId: bookingId,
      },
    });
    if (isReviewed.length) {
      return res.status(400).send("review already done");
    }
    const reviewData = await db.review.create(req.body);
    res.status(201).send(reviewData);
  } catch (err) {
    return res.status(400).send({ err: err });
  }
};
module.exports = { reviewOfBooking };
