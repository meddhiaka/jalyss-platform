import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create <NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('upload',{prefix:'/upload'})
  await app.listen(5000);
}
bootstrap();
