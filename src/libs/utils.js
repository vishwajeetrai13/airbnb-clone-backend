const { includes } = require("lodash")
const db=require("../model/indexModel")

const getCityStateCountryNameByCityId = async (cityId) => {
    const city = await db.city.findOne({
        raw: true,
        attributes:["cityName"],
        where: {
            id:cityId
        },
        include: {
            model: db.state,
            attributes: ["stateName"],
            include: {
                model: db.country,
                attributes:["countryName"],
            }
        }
    })
    return {
        city: city.cityName,
        state: city["state_model.stateName"],
        country:city["state_model.country_model.countryName"]
    }
}

module.exports={getCityStateCountryNameByCityId}