import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(4001);
  console.log('User service is running on port 4001, http://localhost:4001');
}
bootstrap();
