module.exports = (db) => {
  //   user and listing
  db.user.hasMany(db.listing, {
    foreignKey: "hostID",
    sourceKey: "id",
  });
  db.listing.belongsTo(db.user, {
    foreignKey: "hostID",
    targetKey: "id",
  });

  //listing and listing images
  db.listing.hasMany(db.listingImage, {
    foreignKey: "entityId",
    sourceKey: "id",
  });
  db.listingImage.belongsTo(db.listing, {
    foreignKey: "entityId",
    targetKey: "id",
  });

  // bookmark->user listing

  db.user.hasMany(db.bookmark, {
    foreignKey: "userId",
    sourceKey: "id",
  });

  db.bookmark.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
  });

  db.listing.hasMany(db.bookmark, {
    foreignKey: "listingId",
    sourceKey: "id",
  });

  db.bookmark.belongsTo(db.listing, {
    foreignKey: "listingId",
    targetKey: "id",
  });

  // booking->user,listing

  db.user.hasMany(db.booking, {
    foreignKey: "userId",
    sourceKey: "id",
  });

  db.booking.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
  });

  db.listing.hasMany(db.booking, {
    foreignKey: "listingId",
    sourceKey: "id",
  });

  db.booking.belongsTo(db.listing, {
    foreignKey: "listingId",
    targetKey: "id",
  });

  // listing->city

  db.city.hasMany(db.listing, {
    foreignKey: "cityId",
    sourceKey: "id",
  });

  db.listing.belongsTo(db.city, {
    foreignKey: "cityId",
    targetKey: "id",
  });

  //city->state
  db.state.hasMany(db.city, {
    foreignKey: "stateId",
    sourceKey: "id",
  });

  db.city.belongsTo(db.state, {
    foreignKey: "stateId",
    targetKey: "id",
  });

  // state->country

  db.country.hasMany(db.state, {
    foreignKey: "countryId",
    sourceKey: "id",
  });

  db.state.belongsTo(db.country, {
    foreignKey: "countryId",
    targetKey: "id",
  });

  // booking->payment

  db.booking.hasMany(db.payment, {
    foreignKey: "bookingId",
    sourceKey: "id",
  });
  db.payment.belongsTo(db.booking, {
    foreignKey: "bookingId",
    targetKey: "id",
  });
};
