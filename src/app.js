const express=require("express")
var cors = require('cors')
// listingRouteSample = require("./routes/listingRoute").listingRouteSample;
import { listingRouteSample } from "./routes/listingRoute";
let bookingRouteSample = require("./routes/bookingRoute").bookingRouteSample;
const app = express();
app.options('*', cors())
app.set("port", process.env.PORT || 3000)
app.set("env", process.env.NODE_ENV || "development")

app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})
  
app.get('/booking', function (req, res) {
    bookingRouteSample();
    res.send('booking')
})
  
app.get('/listing', function (req, res) {
    listingRouteSample();
    res.send('listing')
})

module.exports = app;
