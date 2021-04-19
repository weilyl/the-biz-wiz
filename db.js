const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = pg({
  host: "biz-wiz.herokuapp.com", //"ec2-34-233-0-64.compute-1.amazonaws.com",
  port: 5432,
  database: "d8uqu0bt7057ho",
  user: process.env.USER || "uikjstnhobxlmz",
  password:
    process.env.PASSWORD ||
    "d47ca69623cdb10dc9875b877e9d59b274bded4b786f41a530c2bcaf43c30244",
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
