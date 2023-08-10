"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const game_info_module_1 = require("./modules/game_info/game_info.module");
const swagger = async (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Game Stats API')
        .setDescription('API Documentation \
      \nParameter with * are required to execute related API.')
        .setVersion('1.0')
        .addServer('/api/')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        deepScanRoutes: true,
        include: [game_info_module_1.GameInfoModule],
    });
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Game Stats API',
        explorer: false,
    });
};
exports.swagger = swagger;
//# sourceMappingURL=swagger.js.map