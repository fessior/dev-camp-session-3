import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import { exampleRouter } from './routes/example';

export async function createApp(): Promise<Express> {
  const app = express();

  /* Instantiate important middlewares */
  app.use(
    compression({
      threshold: 0,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }

        return compression.filter(req, res);
      },
    }),
  );
  app.use(cors());

  /* Apply routes */
  app.use('/example', exampleRouter);

  return app;
}
