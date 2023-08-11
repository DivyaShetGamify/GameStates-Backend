import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { GameInfoModule } from "./modules/game_info/game_info.module";

export const swagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle("Game Stats API")
    .setDescription(
      "API Documentation \
      \nParameter with * are required to execute related API."
    )
    .setVersion("1.0")
    .addServer("/api/")
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
    include: [GameInfoModule],
  });
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "Game Stats API",
    explorer: false,
  });
};
