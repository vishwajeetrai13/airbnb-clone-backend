const {Op}=require('sequelize');
const { sequelize } = require('../model/indexModel');
const db=require('../model/indexModel');




const search=async (req,res)=>{
  if(!req.query.city) res.status(400).send(`Please enter a valid city name`);
  else{
  const listings=await db.listing.findAll({
    where:{
      cityId:{
      [Op.eq]:db.sequelize.literal(`select id from city where cityName=${req.query.city}`)
      }
    }
  })

  res.status(200).send(JSON.stringify(listings));
}
};

const findById=(req,res)=>{
  res.status(200).send(`this is the id of the listing route, ${req.params.id}`);

};

module.exports={search,findById}





// const db = require("../model/indexModel");

// const hello = {
//   list(req, res) {
//     return db.listing
//       .findAll({
//         raw: true,
//         include: [
//           {
//             model: db.listingImage,
//             exclude: ["id"],
//           },
//           {
//             model: db.city,
//             exclude: ["id", "stateId"],
//             //   as: "city",
//           },
//         ],
//       })
//       .then((val) => console.log(val));
//   },
// };

// // console.log(async () => await hello.list());
// hello.list();