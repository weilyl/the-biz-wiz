// Update with your config settings.

require("dotenv").config();

console.log(process.env.USER);
console.log(process.env.PASSWORD);
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
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
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
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
