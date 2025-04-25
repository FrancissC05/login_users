import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // lanza error si hay propiedades desconocidas
      transform: true,         // transforma los tipos (string a number, etc.)
    }),
  );
  await app.listen(3000);
}
bootstrap();
