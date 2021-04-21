require("dotenv").config();
// const log = require("./middleware/log");
const express = require("express");
const app = express();
const businessRouter = require("./routes/business");
// const session = require('express-session');
const cors = require("cors");

const NODE_ENV = process.env.NODE_ENV;

const whiteList = [
    "https://biz-wiz.herokuapp.com/",
    "http://localhost:3030/",
    "http://localhost:3000/",
    "http://localhost:4000/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS; domain needs to be added to whitelist")
      );
    }
  },
};


//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
// NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));


app.use(express.urlencoded());
app.use(express.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// })

app.use(cors())
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
app.get('/', async (req, res) => {
    console.log("you are here, headers:", req.headers);
});

module.exports = app;
