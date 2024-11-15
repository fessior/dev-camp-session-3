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
      return res.status(HttpStatus.NotFound).json({
        message: 'User not found',
      });
    }
    // Verify password given by user
    const isPasswordMatch = await compare(plainTextPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(HttpStatus.Unauthorized).json({
        message: 'Invalid password',
      });
    }
    // Login successful, let's sign a token for this user
    const tokenData: TokenData = {
      username,
      userId: user._id.toString(),
      name: user.name,
    };
    return res.status(HttpStatus.OK).json({ token: signJwtToken(tokenData) });
  } catch (err) {
    return res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
