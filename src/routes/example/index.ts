import { NextFunction, Request, Response, Router } from 'express';
import { sayHello } from './hello';
import { signJwtToken } from '@/auth';

const exampleRouter = Router();

exampleRouter.get('/', sayHello);

exampleRouter.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    /**
     * Verify username and password
     */

    /**
     * Generate JWT token
     */
    res
      .status(200)
      .json({ token: signJwtToken({ userId: '123', username, name: 'Hung' }) });
  },
);

export { exampleRouter };
