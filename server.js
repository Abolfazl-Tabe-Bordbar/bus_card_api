const express = require("express");
const app = express();

const path = require('path');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// ----------------------------------------------------------
var cors = require('cors')


let corsOptions = {
    origin: '*',
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// ----------------------------------------------------------


// ----------------------------------------------------------
const guest = require("./modules/routes/guest.js");
app.use("/",cors(corsOptions) ,guest);

// ----------------------------------------------------------


app.use((req, res) => {
    res.json({
        status: false,
        message: "This route is not in my api"
    });
});



app.listen(4000);