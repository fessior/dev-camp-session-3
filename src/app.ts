import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth';
import { meRouter } from './routes/me';
import { todoRouter } from './routes/todo';

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
  app.use(bodyParser.json());

  /* Apply API routes */
  app.use('/auth', authRouter);
  app.use('/me', meRouter);
  app.use('/todos', todoRouter);

  return app;
}
