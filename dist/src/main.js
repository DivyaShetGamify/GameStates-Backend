"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const helmet = require("helmet");
const swagger_1 = require("./swagger");
const all_exceptions_filter_1 = require("./dispatcher/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 5000;
    app.enableCors({
        origin: '*',
        exposedHeaders: ['Content-Length'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(compression());
    app.use(helmet());
    (0, swagger_1.swagger)(app);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(port);
    common_1.Logger.log(`App is listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map