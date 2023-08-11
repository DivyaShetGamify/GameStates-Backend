import type { Knex } from 'knex';
require('dotenv').config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    migrations: {
      directory: 'src/migrations',
    },
    connection: {
      host: process.env.HOST,
      port: parseInt(process.env.DBPORT),
      database: process.env.DATABASE,
      user: process.env.DBUSER,
      password: process.env.PASSWORD,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
