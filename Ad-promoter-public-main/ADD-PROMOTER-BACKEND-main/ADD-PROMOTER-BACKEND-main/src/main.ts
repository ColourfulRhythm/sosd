import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as requestIp from 'request-ip';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { MongoExceptionFilter } from './filters/mongoose.excepions.filter';
import { MongooseExceptionFilter } from './filters/mongo.exception.filter';
import { UnhandledExceptionHandler } from './filters/unhandled-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const logger = new Logger('Main');
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalFilters(new UnhandledExceptionHandler());

  setupSwagger(app);
  app.use(helmet());
  app.use(requestIp.mw());
  // await app.listen(AppModule.port);
  await app.listen(AppModule.port);

  // Log documentation url
  const baseUrl = AppModule.getBaseUrl(app);
  const url = `http://${baseUrl}:${AppModule.port}`;
  logger.log(`API Documentation available at ${url}/docs`);
}
bootstrap();
