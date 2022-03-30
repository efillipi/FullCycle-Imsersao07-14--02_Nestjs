import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from 'src/config/server';

async function server() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
}
server().then(() => {
  console.log(`Server online in localhost:${PORT}`);
});
