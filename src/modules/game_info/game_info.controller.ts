import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GameInfoType, Games } from "src/config/constants";
import { TransformInterceptor } from "src/dispatcher/transform.interceptor";
import { SuccessResponse } from "src/interface/success.response.interface";
import { GameResponseDto } from "./dto/game.data.response.dto";
import { GameInfoService } from "./game_info.service";

@Controller("game-info")
@ApiTags("Game Stats")
@UseInterceptors(TransformInterceptor)
export class GameInfoController {
  constructor(private readonly gameInfoService: GameInfoService) {}

  @ApiOperation({ summary: "API to seed Game Data" })
  @Post()
  async create(): Promise<SuccessResponse<{}>> {
    const message = await this.gameInfoService.create();
    return { data: {}, message: "" };
  }

  @ApiOperation({ summary: "API to get Game Info" })
  @ApiOkResponse({ description: "success" })
  @Get()
  async findOne(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
    @Query("game") game: Games,
    @Query("gameInfo") gameInfo: GameInfoType
  ): Promise<SuccessResponse<GameResponseDto>> {
    const data = await this.gameInfoService.findOne(
      startDate,
      endDate,
      game,
      gameInfo
    );
    return { data: data, message: `Every month's ${gameInfo}` };
  }
}
