import { ConfigModule, ConfigService } from "@nestjs/config";
import { KnexModule } from "nest-knexjs";
require("dotenv").config();

export const DB_CONNECTION = {
  GAME_DATA: "GAME_DATA",
};

export const databaseProvider = [
  KnexModule.forRootAsync(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: "mysql2",
          connection: {
            host: process.env.HOST,
            port: parseInt(process.env.DBPORT) || 3306,
            user: process.env.DBUSER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
          },
          useNullAsDefault: true,
        },
      }),
    },
    DB_CONNECTION.GAME_DATA
  ),
];
