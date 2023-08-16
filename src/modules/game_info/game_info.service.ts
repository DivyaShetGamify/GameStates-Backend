import { BadRequestException, Injectable } from "@nestjs/common";
import { jsonData } from "gameData";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { COLUMN, DB_TABLE, GameInfoType, Games } from "src/config/constants";
import { v4 as uuidv4 } from "uuid";
import { DB_CONNECTION } from "../../database/database.provider";
import {
  GameProfitResponseDto,
  GameResponseDto,
} from "./dto/game.data.response.dto";

@Injectable()
export class GameInfoService {
  constructor(
    @InjectConnection(DB_CONNECTION.GAME_DATA) private readonly knex: Knex
  ) {}

  async create() {
    const seedData = jsonData.map((record) => ({
      id: uuidv4(), // Generate a new UUID for each record using UUIDv4
      month: record.month,
      game: record.game,
      betCount: parseInt(record.betCount),
      playerCount: record.playerCount,
      betAmount: parseFloat(record.betAmount),
      payout: parseFloat(record.payout),
      rtp: parseFloat(record.rtp),
      profit: record.profit,
    }));
    try {
      await this.knex.insert(seedData).into(DB_TABLE.GAME_STATS);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  /**
   * Get Games stats
   * @param startDate
   * @param endDate
   * @param game
   * @param gameInfo
   * @returns
   */

  async findOne(
    startDate: string,
    endDate: string,
    game: Games,
    gameInfo: GameInfoType
  ) {
    if (!Object.values(GameInfoType).includes(gameInfo)) {
      throw new BadRequestException("Requested game info does not exists");
    }
    if (!Object.values(Games).includes(game)) {
      throw new BadRequestException("Game does not exists");
    }

    const today = new Date(); // Extract the year, month, and day from the Date object
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1

    const formattedDate = `${year}-${month}`;

    if (startDate > formattedDate) {
      throw new BadRequestException(
        "start Date should be less than today's date"
      );
    }

    if (endDate < startDate) {
      throw new BadRequestException(
        "End Date should be greater than start date"
      );
    }

    // For BetAmount, Payout and Profit
    if (gameInfo === GameInfoType.betAmount) {
      let gameStats = await this.knex
        .select("*", COLUMN.MONTH)
        .whereBetween(COLUMN.MONTH, [startDate, endDate])
        .andWhere(COLUMN.GAME, game)
        .from(DB_TABLE.GAME_STATS);
      return new GameProfitResponseDto(gameStats);
    }

    // For Bet Count, Player Count and RTP
    const gameParameter = Object.keys(GameInfoType).find(
      (key) => GameInfoType[key] === gameInfo
    );

    const gameData = await this.knex
      .select(gameParameter, COLUMN.MONTH)
      .whereBetween(COLUMN.MONTH, [startDate, endDate])
      .andWhere(COLUMN.GAME, game)
      .from(DB_TABLE.GAME_STATS);

    const gameDataObj = gameData.reduce((result, item) => {
      result[item.month] = item[gameParameter];
      return result;
    }, {});

    return new GameResponseDto(gameDataObj);
  }
}
