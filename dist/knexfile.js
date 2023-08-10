"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    development: {
        client: 'mysql2',
        migrations: {
            directory: 'src/migrations',
        },
        connection: {
            host: process.env.HOST,
            port: parseInt(process.env.DBPORT),
            database: process.env.DATABASE,
            user: process.env.USERNAME,
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
//# sourceMappingURL=knexfile.js.map