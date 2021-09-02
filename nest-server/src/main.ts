import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置 全局路由前缀
  app.setGlobalPrefix('api');

  const PORT = 3200;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}

bootstrap();
