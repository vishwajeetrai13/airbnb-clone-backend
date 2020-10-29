const { review } = require("../model/indexModel");
const db = require("../model/indexModel");

const search = async (req, res) => {
  try {
    if (!req.query.city) {
      res.status(400).send("Please Enter a valid city");
    } else if (
      req.query.city[0] == "'" ||
      req.query.city[req.query.city.length - 1] == "'"
    ) {
      res
        .status(400)
        .send("Please remove the double-quotes from the query param value");
    } else {
      const listings = await db.listing.findAll({
        include: {
          model: db.city,
          attributes: ["cityName"],
          where: {
            cityName: req.query.city,
          },
        },
      });

      if (listings.length == 0) {
        res.status(200).send("we are not yet operational in this city");
      }

      const images = await Promise.all(
        listings.map(async listing => {
          return await db.listingImage.findAll({
            attributes: ["url"],
            where: {
              entityId: listing.id,
            },
          });
        })
      );

      const listingsAndImages = [];

      for (let i = 0; i < listings.length; i++) {
        let listingCopy = JSON.parse(JSON.stringify(listings));
        listingCopy[i].images = images[i];
        listingsAndImages.push(listingCopy[i]);
      }

      res.status(200).send(listingsAndImages);
    }
  } catch (err) {
    console.error(err);
  }
};

const findById = async (req, res) => {
  try {
    if (Number(req.params.id).toString() !== req.params.id) {
      res.status(400).send(`Please enter a valid id-number`);
    } else {
      const listing = await db.listing.findOne({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!listing) {
        return res.status(400).send(`No Listings exist for this entry`);
      }

      const city = await db.city.findOne({
        where: {
          id: listing.cityId,
        },
      });

      const host = await db.user.findAll({
        where: {
          id: listing.hostID,
        },
      });

      const images = await db.listingImage.findAll({
        attributes: ["url"],
        where: {
          entityId: listing.id,
        },
      });

      const booking = await db.booking.findAll({
        where: {
          listingId: listing.id,
        },
      });

      const review = await Promise.all(
        booking.map(async booking => {
          return await db.review.findOne({
            where: {
              bookingId: booking.id,
            },
          });
        })
      );

      const reviewBy = await Promise.all(
        booking.map(async booking => {
          return await db.user.findOne({
            where: {
              id: booking.userId,
            },
          });
        })
      );

      let rev;
      if ((review.includes(null) && review.length!=1) || review) {
        rev = review.map((rev, i) => {
          rev = JSON.parse(JSON.stringify(rev));
          if(rev!=null){
          rev[`reviewerInfo`] = {
            firstName: reviewBy[i].firstName,
            lastName: reviewBy[i].lastName,
            pic: reviewBy[i].profilePictureUrl,
          };
        }
          return rev;
        });
      } else {
        rev = review;
      }
      rev=rev.filter(rev=>rev!=null)

      const deepClone = entity => JSON.parse(JSON.stringify(entity));

      let resObj = {
        listing: deepClone(listing),
        city: deepClone(city),
        host: deepClone(host),
        images: deepClone(images),
        bookings: deepClone(booking),
        review: deepClone(rev),
        // review: deepClone(review),
        // reviewBy:deepClone(reviewBy),
      };
      res.status(200).send(resObj);
    }
  } catch (err) {
    console.error(err);
  }
};


// listingDetails:
// address: "aaaa"
// avgRating: 5
// cityId: "467"
// features: {beds: 2, bedrooms: 2, policies: {…}, amenities: Array(10), bathrooms: 1, …}
// hostID: 99
// listingDescription: "sa"
// miscCostPercentage: 10
// pricePerDay: "1000"
// title: "dadf"
// __proto__: Object
// listingImages: (4) ["https://desi-airbnb-clone.s3.ap-south-1.amaz

const create = async (req, res) => {
  try{
  const listingDetails = req.body.listingDetails;
  const listingImages = req.body.listingImages;
  const listingCreate = await db.listing.build(listingDetails).save();
  const imageArray = await Promise.all(listingImages.map(async(image) => {
    return await db.listingImage.build({ url: image, entityId: listingCreate.id }).save();
  }))
    listingCreate["images"] = imageArray
    const resData={...listingCreate.dataValues,images:[...imageArray]}
    console.log(resData)
    return res.status(201).send(resData)
  } catch (err) {
    console.log(err)
    res.status(400).send({err:"something went wrong"})
  }
};

module.exports = { search, findById,create };
