import { App } from './app/app';

async function bootstrap() {
  const PORT = 3000 || process.env.PORT;
  const app = await App.createApp();
  await app.listen(PORT);
}
bootstrap();
