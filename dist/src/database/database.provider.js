"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = exports.DB_CONNECTION = void 0;
const config_1 = require("@nestjs/config");
const nest_knexjs_1 = require("nest-knexjs");
require('dotenv').config();
exports.DB_CONNECTION = {
    GAME_DATA: 'GAME_DATA',
};
exports.databaseProvider = [
    nest_knexjs_1.KnexModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: (configService) => ({
            config: {
                client: 'mysql2',
                connection: {
                    host: process.env.HOST,
                    port: parseInt(process.env.DBPORT) || 3306,
                    user: process.env.USERNAME,
                    password: process.env.PASSWORD,
                    database: process.env.DATABASE,
                },
                useNullAsDefault: true,
            },
        }),
    }, exports.DB_CONNECTION.GAME_DATA),
];
//# sourceMappingURL=database.provider.js.map