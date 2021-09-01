import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 3200;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}

bootstrap();
