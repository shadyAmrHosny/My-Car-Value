import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // The purpose of this property is to make sure
      // that incoming requests don't have extraneous properties
      //in the body that we are not expecting.
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();