const Joi = require("joi");

const bookingValidationSchema = Joi.object({
  userId: [Joi.string().alphanum().required(), Joi.number()],
  listingId: [Joi.string().alphanum().required(), Joi.number()],
  checkinDate: Joi.date().iso(),
  checkoutDate: Joi.date().iso(),
});

const reviewSchema = Joi.object({
  bookingId: [Joi.string().alphanum().required(), Joi.number()],
  description: Joi.string(),
  rating: Joi.number().integer().min(1).max(5),
});
const bookingValidator = async (req, res, next) => {
  try {
    const { err, value } = await bookingValidationSchema.validateAsync(
      req.body
    );
    if (err) {
      return res.status(400).send("invalid data fields");
    }
    next();
  } catch (err) {
    return res.status(400).send("invalid data fields");
  }
};

const reviewValidation = async (req, res, next) => {
  try {
    const { err, value } = await reviewSchema.validateAsync(req.body);
    if (err) {
      return res.status(400).send("invalid data fields");
    }
    next();
  } catch (err) {
    return res.status(400).send({ err: "invalid data entry" });
  }
};

module.exports = {
  bookingValidator,
  reviewValidation,
};
