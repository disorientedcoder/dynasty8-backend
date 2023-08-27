const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");
// const session = require('express-session');
// const mongoDBSession = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
//allow using a .env file
require("dotenv").config();
//importing data model schemas
let { models } = require("./models"); 
//creates a new instance of express application
const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



//calling setUser function
// app.use(setUser)

// add cors header to the server
app.use(cors({
  origin: '*'
}));


//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const routes  = require('./routes');
//setup middle ware for routes
app.use('/routes', routes);

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});