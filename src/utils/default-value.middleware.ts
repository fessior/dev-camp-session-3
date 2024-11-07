import { NextFunction, Request, Response } from 'express';

export function defaultValueMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  /**
   * By default, users are not authenticated.
   * Auth middleware should be run for request to be marked as authenticated.
   */
  req.user.isAuthenticated = false;

  req.user.token = null;

  next();
}
