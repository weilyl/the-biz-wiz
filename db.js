const knex = require("./knex");
const knexfile = require("./knexfile");

knex(knexfile);

const pg = require("pg-promise")();

const db = pg({
  host: "ec2-34-233-0-64.compute-1.amazonaws.com",
  port: 5432,
  database: "d8uqu0bt7057ho",
  user: process.env.USER || "uikjstnhobxlmz",
  password:
    process.env.PASSWORD ||
    "d47ca69623cdb10dc9875b877e9d59b274bded4b786f41a530c2bcaf43c30244",
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

/*
const {Client} = require('pg');
const params = {
  host: 'ec2-34-233-0-64.compute-1.amazonaws.com',
  user: 'uikjstnhobxlmz',
  password: 'd47ca69623cdb10dc9875b877e9d59b274bded4b786f41a530c2bcaf43c30244',
  port: 5432,
  database: 'd8uqu0bt7057ho',
  ssl: true
};

const client = new Client(params);
client.connect();
*/
module.exports = db;
