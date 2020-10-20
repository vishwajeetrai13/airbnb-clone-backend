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

  // listing and feature -> remove from table and merge with listings
  //   db.listing.belongsTo(db.feature, {
  //     foreignKey: "featuresId",
  //     targetKey: "id",
  //   });

  //   db.feature.hasMany(db.listing, {
  //     foreignKey: "featuresId",
  //     sourceKey: "id",
  //   });

  // add new
};
