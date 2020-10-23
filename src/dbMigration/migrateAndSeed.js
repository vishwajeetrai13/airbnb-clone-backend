const faker = require("faker");
const random = require("lodash").random;
const times = require("lodash").times;

var sequelize = require("../config/configDb");
const db = require("../model/indexModel");

feedRandomUsers = (numberOFData) => {
  return db.user.bulkCreate(
    times(numberOFData, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      introductionOfUser: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      dob: faker.date.past(),
      profilePictureUrl: faker.image.imageUrl(),
    }))
  );
};

feedRandomListings = (numberOFData) => {
  return db.listing.bulkCreate(
    times(numberOFData, () => ({
      hostID: random(1, numberOFData),
      pricePerDay: random(1000, 10000),
      miscCostPercentage: random(1, 100),
      address: faker.address.streetAddress(),
      listingDescription: faker.lorem.sentence(),
      avgRating: random(1, 5),
      cityId: random(1, numberOFData),
      features: {
        typeofListing: "private room",
        bedrooms: random(1, 5),
        bathrooms: random(1, 5),
        beds: random(1, 5),
        maxOccupants: random(1, 5),
        policies: {},
        amenities: {},
      },
    }))
  );
};

const feedRandomListingImages = async (numberOFData) => {
  let numberOfImages = 5;
  for (let i = 1; i <= numberOFData; i++) {
    await db.listingImage.bulkCreate(
      times(numberOfImages, () => ({
        entityId: i,
        url: faker.image.imageUrl(),
      }))
    );
  }
};

feedBookmark = (numberOFData) => {
  return db.bookmark.bulkCreate(
    times(numberOFData, () => ({
      listingId: random(1, numberOFData),
      userId: random(1, numberOFData),
    }))
  );
};

feedCity = (numberOFData) => {
  return db.city.bulkCreate(
    times(numberOFData, () => ({
      cityName: faker.address.city(),
      stateId: random(1, numberOFData),
    }))
  );
};

feedState = (numberOFData) => {
  return db.state.bulkCreate(
    times(numberOFData, () => ({
      stateName: faker.address.state(),
      countryId: random(1, numberOFData),
    }))
  );
};
feedCountry = (numberOFData) => {
  return db.country.bulkCreate(
    times(numberOFData, () => ({
      countryName: faker.address.country(),
    }))
  );
};

feedBooking = async (numberOFData) => {
  for (let i = 0; i < numberOFData; i++) {
    currDate = faker.date.recent();
    let futureDate = new Date();
    futureDate.setDate(currDate.getDate() + random(4, 10));
    await db.booking.create({
      userId: random(1, numberOFData),
      listingId: random(1, numberOFData),
      checkinDate: currDate,
      checkoutDate: futureDate,
      totalCost: random(1000, 10000),
    });
  }
};

feedReview = async (numberOFData) => {
  return db.review.bulkCreate(
    times(numberOFData, () => ({
      bookingId: random(1, numberOFData),
      description: faker.lorem.sentence(),
      rating: random(1, 5, true),
    }))
  );
};

showUser = async () => {
  console.log(
    await db.user.findAll({
      raw: true,
    })
  );
};

showListing = async () => {
  console.log(
    await db.listing.findAll({
      raw: true,
      include: {
        model: db.user,
      },
    })
  );
};

showBooking = async () => {
  console.log(
    await db.booking.findAll({
      raw: true,
      include: [
        {
          model: db.user,
        },
        {
          model: db.listing,
        },
      ],
    })
  );
};

async function main() {
  try {
    const numberOFData = 500;
    await sequelize.sync({ force: true });
    await feedCountry(numberOFData);
    await feedState(numberOFData);
    await feedCity(numberOFData);
    await feedRandomUsers(numberOFData);
    await feedRandomListings(numberOFData);
    await feedRandomListingImages(numberOFData);
    await feedBookmark(numberOFData);
    await feedBooking(numberOFData);
    await feedReview(numberOFData);
    // TODO : need to add feeder for Payments

    // showUser();
    // showListing();
    // showBooking();
    // console.log(
    //   await db.city.findAll({
    //     raw: true,
    //     include: [
    //       {
    //         model: db.state,
    //         include: [{ model: db.country }],
    //       },
    //     ],
    //   })
    // );
  } catch (error) {
    console.log(error);
  }
}
main();
