import { GameInfoType, Games } from 'src/config/constants';
import { SuccessResponse } from 'src/interface/success.response.interface';
import { GameResponseDto } from './dto/game.data.response.dto';
import { GameInfoService } from './game_info.service';
export declare class GameInfoController {
    private readonly gameInfoService;
    constructor(gameInfoService: GameInfoService);
    create(): Promise<SuccessResponse<{}>>;
    findOne(startDate: string, endDate: string, game: Games, gameInfo: GameInfoType): Promise<SuccessResponse<GameResponseDto>>;
}
