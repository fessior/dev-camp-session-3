import { HttpStatus } from '@/constants';
import { UserModel } from '@/models';
import { Request, Response } from 'express';
import { z } from 'zod';
import { compare } from 'bcrypt';
import { signJwtToken, TokenData } from '@/auth';

export const loginBodySchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginBody = z.infer<typeof loginBodySchema>;

export async function login(req: Request, res: Response) {
  try {
    const { username, password: plainTextPassword } = req.body as LoginBody;
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(HttpStatus.NotFound).json({
        message: 'User not found',
      });
      return;
    }
    // Verify password given by user
    const isPasswordMatch = await compare(plainTextPassword, user.password);
    if (!isPasswordMatch) {
      res.status(HttpStatus.Unauthorized).json({
        message: 'Invalid password',
      });
      return;
    }
    // Login successful, let's sign a token for this user
    const tokenData: TokenData = {
      username,
      userId: user._id.toString(),
      name: user.name,
    };
    res.status(HttpStatus.OK).json({ token: signJwtToken(tokenData) });
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
