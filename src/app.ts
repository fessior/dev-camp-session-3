import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';

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

  return app;
}
