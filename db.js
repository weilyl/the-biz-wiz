const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = process.env.NODE_ENV === 'production' ? pg({
  connectionString: process.env.DATABASE_URL
}) : pg({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

module.exports = db;
