const db = require("../model/indexModel");

const hello = {
  list(req, res) {
    return db.listing
      .findAll({
        raw: true,
        include: [
          {
            model: db.listingImage,
            exclude: ["id"],
          },
          {
            model: db.city,
            exclude: ["id", "stateId"],
            //   as: "city",
          },
        ],
      })
      .then((val) => console.log(val));
  },
};

// console.log(async () => await hello.list());
hello.list();
