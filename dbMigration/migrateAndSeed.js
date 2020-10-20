const { fake } = require("faker");
const faker = require("faker");
const random = require("lodash").random;
const times = require("lodash").times;
var Sequelize = require("sequelize");
var sequelize = require("../src/config/configDb");
const db = require("../src/sequelize/indexModel");

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
      featuresId: random(1, numberOFData),
    }))
  );
};

feedRandomListingImages = (numberOFData) => {
  return db.listingImage.bulkCreate(
    times(numberOFData, () => ({
      entityId: random(1, numberOFData),
      url: faker.image.imageUrl(),
    }))
  );
};

randomFeatures = (numberOFData) => {
  return db.feature.bulkCreate(
    times(numberOFData, () => ({
      typeofListing: "private room",
      bedrooms: random(1, 5),
      bathrooms: random(1, 5),
      beds: random(1, 5),
      maxOccupants: random(1, 5),
      policies: {},
      amenities: {},
    }))
  );
};

async function main() {
  try {
    const numberOFData = 20;
    await sequelize.sync({ force: true });
    await feedRandomUsers(numberOFData);
    await feedRandomListings(numberOFData);
    await feedRandomListingImages(numberOFData);
    await randomFeatures(numberOFData);
    console.log(
      await db.listing.findAll({
        raw: true,
        include: [
          {
            model: db.feature,
          },
        ],
      })
    );
  } catch (error) {
    console.log(error);
  }
}
main();
