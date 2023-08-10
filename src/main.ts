import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { swagger } from './swagger';
import { AllExceptionsFilter } from './dispatcher/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 9000;

  app.enableCors({
    origin: '*',
    exposedHeaders: ['Content-Length'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(compression());
  app.use(helmet());

  swagger(app);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(`App is listening on port ${port}`);
}
bootstrap();
