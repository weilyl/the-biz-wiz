const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = pg({
  host: process.env.HOST || "https://biz-wiz.herokuapp.com",
  port: 5432,
  database: process.env.DATABASE_URL || "d8uqu0bt7057ho",
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
