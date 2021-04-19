// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },
  },

  staging: {
    client: "postgresql",
    connection:
      process.env.DATABASE_URL ||
      "postgres://uikjstnhobxlmz:d47ca69623cdb10dc9875b877e9d59b274bded4b786f41a530c2bcaf43c30244@ec2-34-233-0-64.compute-1.amazonaws.com:5432/d8uqu0bt7057ho",
    pool: {
      min: 2,
      max: 10,
    },
    ssl: false,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection:
      process.env.DATABASE_URL ||
      "postgres://uikjstnhobxlmz:d47ca69623cdb10dc9875b877e9d59b274bded4b786f41a530c2bcaf43c30244@ec2-34-233-0-64.compute-1.amazonaws.com:5432/d8uqu0bt7057ho",
    pool: {
      min: 2,
      max: 10,
    },
    ssl: false,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
