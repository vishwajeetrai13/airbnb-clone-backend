const { Sequelize } = require("sequelize");
const path = require("path");

const { config } = require(path.join(__dirname, "/config/configDb"));

const { database, username: user, password, host } = config;

const sequelize = new Sequelize(database,user,password,{
    host:host,
    dialect:'mysql',
    logQueryParameters:true,
    benchmark:true
});


const models = [
  require(path.join(__dirname, "./models/Booking")),
  require(path.join(__dirname, "./models/Bookmark")),
  require(path.join(__dirname, "./models/City")),
  require(path.join(__dirname, "./models/Country")),
  require(path.join(__dirname, "./models/Features")),
  require(path.join(__dirname, "./models/Image")),
  require(path.join(__dirname, "./models/Listings")),
  require(path.join(__dirname, "./models/Payments")),
  require(path.join(__dirname, "./models/Reviews")),
  require(path.join(__dirname, "./models/State")),
  require(path.join(__dirname, "./models/Users")),
];



for (let model of models) {
  model(sequelize);
}

// console.log(sequelize.models) // after the above step, the models generated are available which can be then used to query



sequelize.sync({force:true}).then(()=>{
  console.log('table created in memory')
  // logic to Migrate/ dump data 
  // to the DB shall go here, this just created the table in the DB
}).catch(error=>console.error(error))



