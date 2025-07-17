import { NestFactory } from '@nestjs/core';
import { AnswerModule } from './answer.module';

async function bootstrap() {
  const app = await NestFactory.create(AnswerModule);
  await app.listen(4003);
  console.log('Answer service is running on port 4003, http://localhost:4003');
}
bootstrap();
