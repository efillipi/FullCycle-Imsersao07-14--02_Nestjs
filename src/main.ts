import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.API_PORT;

async function server() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
server().then(() => {
  console.log(`Server online in localhost:${PORT}`);
});
