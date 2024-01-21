import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.enableCors({ origin: '*', credentials: true });

  await app.listen(PORT);
}
bootstrap();
