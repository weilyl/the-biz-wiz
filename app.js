require("dotenv").config();
const log = require("./middleware/log");
const express = require("express");
const app = express();
const businessRouter = require("./routes/business");

const NODE_ENV = process.env.NODE_ENV;
const whiteList = ["https://biz-wiz.herokuapp.com/", "http://localhost:3030"];
// const session = require('express-session');
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS,domain needs to be added to whitelist")
      );
    }
  },
};

//middleware
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));

app.use(express.urlencoded());
app.use(express.json());

// set up sessions
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// routers
app.use("/business", businessRouter);

module.exports = app;
