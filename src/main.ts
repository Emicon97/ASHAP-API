import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

export const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT');
  const FRONTEND = configService.get<string>('FRONTEND');

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.enableCors({ origin: FRONTEND, credentials: true });
  app.use(cookieParser());

  await app.listen(PORT);
}
bootstrap();
