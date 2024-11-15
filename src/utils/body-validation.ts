import { HttpStatus } from '@/constants';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function bodyValidation(schema: z.Schema) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(HttpStatus.BadRequest).json({ message: error.errors });
    }
  };
}
