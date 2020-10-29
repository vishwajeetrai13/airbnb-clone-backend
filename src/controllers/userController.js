// import model
const db = require("../model/indexModel");
const utils=require("../libs/utils")

const userInfo = async (req, res) => {
  try {
    const userId = req.params["id"];
    const userData = await db.user.findOne({
      raw: true,
      where: {
        id: userId,
      },
    });
    if (!userData) {
      return res.status(400).send("user doesn't exist");
    }
    const bookingHistoryList = await db.booking.findAll({
      raw: true,
      where: {
        userId: userId,
      },
    })
    const bookingHistory=await Promise.all(bookingHistoryList.map(async(booking) => {
      const listingImage = await db.listingImage.findOne({
        raw: true, where: {
          entityId:booking.listingId
        }
      })
      const listingDetails = await db.listing.findOne({
        raw: true,
        where: {
          id:booking.listingId
        }
      })
      const hostDetail = await db.user.findOne({
        raw: true,
        attributes:["firstName","lastName"],
        where: {
          id:listingDetails.hostID
        }
      })
      const reviewDetail = await db.review.findOne({
        raw: true,
        where: {
          bookingId:booking.id
        }
      })
      
      const cityData = await utils.getCityStateCountryNameByCityId(listingDetails.cityId)
      const listing={...listingDetails,listingImage,cityData,hostDetail}
      const boo={...booking,listing,reviewDetail}
      return boo;
    }))
    const allListing = await db.listing.findAll({
      raw: true,
      where: {
        hostID: userId,
      },
    });
    const hostListing = await Promise.all(allListing.map(async(list) => {
      const listingImage = await db.listingImage.findOne({
        raw: true, where: {
          entityId:list.id
        }
      })
      const cityData = await utils.getCityStateCountryNameByCityId(list.cityId)
      return ({...list,listingImage,cityData})
    }))
    return res.status(200).send({ ...userData, bookingHistory, hostListing });
  } catch (err) {
    console.log(err)
    res.status(400).send({ err: "something went wrong" });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params["id"];
    await db.user.findByPk(userId).then((result) => {
      if (!result) {
        res.status(404).send({ err: "user doesn't exist" });
      }
    });
    await db.user.update(req.body, {
      where: { id: userId },
      returning: true,
      plain: true,
    });
    const updateData = await db.user.findByPk(userId);
    res.status(200).send(updateData);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

/*
{
  "firstName": "Glen",
  "lastName": "Feeney",
  "introductionOfUser": "Inventore placeat velit eligendi exercitationem neque asperiores dolores.",
  "email": "Fausto.Kreiger92@yahoo.com",
  "password": "Vzdwr5nQpOh45nN",
  "dob": "2020-08-09T05:55:15.000Z",
  "profilePictureUrl": "http://placeimg.com/640/480"
}
*/
const createUser = async (req, res) => {
  try {
    const data = req.body;
    // const userData = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   introductionOfUser: data.introductionOfUser,
    //   email: data.email,
    //   password: data.password,
    //   dob: data.dob,
    //   profilePictureUrl: data.profilePictureUrl,
    // };
    const isUserExist = await db.user.findAll({
      where: {
        email: data.email,
      },
    });
    if (isUserExist.length > 0) {
      res.status(400).send("user already exist");
    }
    const record = await db.user.build(data).save();
    res.status(201).send(record);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

module.exports = { userInfo, editUser, createUser };
