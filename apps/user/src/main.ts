import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4001);
  console.log('User service is running on port 4001, http://localhost:4001');

}
bootstrap();
