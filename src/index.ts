import mongoose from 'mongoose';
import { createApp } from './app';
import { config } from './config';

async function bootstrap() {
  /* Set some mongoose settings */
  mongoose.set('debug', config.mongooseDebug);

  /* Try to establish database connection first */
  await mongoose.connect(config.dbConnString);
  console.log('Database connected successfully');

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
