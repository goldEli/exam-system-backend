import { NestFactory } from '@nestjs/core';
import { AnalyseModule } from './analyse.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyseModule);
  await app.listen(4004);
  console.log('Analyse service is running on port 4004, http://localhost:4004');
}
bootstrap();
