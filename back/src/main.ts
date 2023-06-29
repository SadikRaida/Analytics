import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  console.log(process.env)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT_BACK || 4000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
  
}
bootstrap();
