const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = pg({
  // host: process.env.HOST,
  // port: 5432,
  // database: process.env.DATABASE,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  connectionString: process.env.DATABASE_URL
});

module.exports = db;
