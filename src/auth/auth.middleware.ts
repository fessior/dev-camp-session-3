import { HttpStatus } from '@/constants';
import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from './token';

function getAuthToken(req: Request): string | undefined {
  // Prioritize getting credentials from header first
  const authHeader = req.headers.authorization;
  if (authHeader) return authHeader.split(' ')[1];

  // Then we can search for credentials in query
  const authQuery = req.query.token;
  if (authQuery) return authQuery as string;

  return undefined;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authJwt = getAuthToken(req);
  if (!authJwt) {
    res.status(HttpStatus.Unauthorized).end();
  }
  try {
    req.token = verifyJwtToken(authJwt);
    next();
  } catch (err) {
    console.error(err);
    res.status(HttpStatus.Unauthorized).end();
  }
}
