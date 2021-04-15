require("dotenv").config();
const log = require("./middleware/log");
const express = require("express");
const app = express();
const businessRouter = require("./routes/business");
// const session = require('express-session');

//middleware
app.use(express.urlencoded());
app.use(express.json());

// set up sessions
// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: false,
//     })
// )

// routers
app.use("/business", businessRouter);

module.exports = app;
