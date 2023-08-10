import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { DB_CONNECTION } from 'src/database/database.provider';
import { jsonData } from 'gameData';
import { InjectConnection } from 'nest-knexjs';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { jsonData } from 'gameData';

dotenv.config();

@Injectable()
export class SeederService {
  constructor(
    @InjectConnection(DB_CONNECTION.GAME_DATA) private readonly knex: Knex,
  ) {}

  async seed() {
    const seedData = jsonData.map((record) => ({
      id: uuidv4(), // Generate a new UUID for each record using UUIDv4
      month: record.month,
      game: 'God Of Fortune',
      betCount: parseInt(record.betCount),
      playerCount: record.playerCount,
      betAmount: parseFloat(record.betAmount),
      payout: parseFloat(record.payout),
      rtp: parseFloat(record.rtp),
      profit: record.profit,
    }));
    try {
      this.knex.insert(seedData).into('game_info');
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}

// export async function seed(knex: Knex): Promise<any> {
//   // Deletes ALL existing entries
//   // await knex('game_info').del();

//   // Convert the JSON data into the format expected by the table
//   const seedData = jsonData.map((record) => ({
//     id: uuidv4(), // Generate a new UUID for each record using UUIDv4
//     month: record.month,
//     betCount: parseInt(record.betCount),
//     playerCount: record.playerCount,
//     betAmount: parseFloat(record.betAmount),
//     payout: parseFloat(record.payout),
//     rtp: parseFloat(record.rtp),
//     profit: record.profit,
//   }));

//   // Inserts seed entries
//   return knex.insert(seedData).into(DB_CONNECTION.GAME_DATA);
// }
