import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.enableCors({
   origin: true,
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
  });
  await app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
  });
}
bootstrap();
