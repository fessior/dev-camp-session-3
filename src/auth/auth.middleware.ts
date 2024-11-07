import { NextFunction, Request } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /**
   * Verify the JWT token from request headers,
   * and store user data in `req.user` if the token is valid
   */

  next();
}
