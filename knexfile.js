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
      process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection:
      process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
