const knexfile = require("./knexfile");

const pg = require("pg-promise")();

const db = NODE_ENV === 'production' ? pg({
  connectionString: process.env.DATABASE_URL
}) : pg({
  host: process.env.test.HOST,
  port: 5432,
  database: process.env.test.DATABASE,
  user: process.env.test.USER,
  password: process.env.test.PASSWORD,
});

module.exports = db;
