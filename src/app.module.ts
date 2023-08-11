import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { GameInfoModule } from "./modules/game_info/game_info.module";

@Module({
  imports: [DatabaseModule, GameInfoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
