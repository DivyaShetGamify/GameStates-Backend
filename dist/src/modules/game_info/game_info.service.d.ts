import { Knex } from 'knex';
import { GameInfoType, Games } from 'src/config/constants';
import { GameResponseDto } from './dto/game.data.response.dto';
export declare class GameInfoService {
    private readonly knex;
    constructor(knex: Knex);
    create(): Promise<void>;
    findOne(startDate: string, endDate: string, game: Games, gameInfo: GameInfoType): Promise<GameResponseDto>;
}
