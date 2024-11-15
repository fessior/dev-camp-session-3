import { z } from 'zod';
import { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/constants';
import { UserModel } from '@/models';
import { config } from '@/config';

export const signupBodySchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  name: z.string().min(1, 'Name is required'),
});

type SignupBody = z.infer<typeof signupBodySchema>;

async function usernameExists(username: string) {
  const userCount = await UserModel.countDocuments({ username });
  return userCount > 0;
}

export async function signup(req: Request, res: Response) {
  try {
    const {
      username,
      password: plainTextPassword,
      name,
    } = req.body as SignupBody;

    // Verify if username already exists
    if (await usernameExists(username)) {
      res.status(HttpStatus.Conflict).json({
        message: 'Username already exists',
      });
      return;
    }

    const hashedPassword = await hash(plainTextPassword, config.saltRounds);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      name,
    });
    await newUser.save();

    res.status(HttpStatus.OK).end();
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
