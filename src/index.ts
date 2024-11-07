import { createApp } from './app';
import { config } from './config';

async function bootstrap() {
  /* Start server based on app and listen on pre-configured port */
  const port = config.port;
  const app = await createApp();
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

bootstrap()
  .then(() => {
    console.log('Server startup successful');
  })
  .catch(err => {
    console.error('Server startup failed', err);
  });
