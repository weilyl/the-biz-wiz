
const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = pg({
  host: process.env.HOST || "https://biz-wiz.herokuapp.com",
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});


module.exports = db;
