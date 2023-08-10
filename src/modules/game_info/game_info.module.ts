import { Module } from '@nestjs/common';
import { GameInfoController } from './game_info.controller';
import { GameInfoService } from './game_info.service';

@Module({
  controllers: [GameInfoController],
  providers: [GameInfoService]
})
export class GameInfoModule {}
