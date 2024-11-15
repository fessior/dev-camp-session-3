import { HttpStatus } from '@/constants';
import { UserModel } from '@/models';
import { Request, Response } from 'express';

interface GetMyProfileResponse {
  username: string;
  name: string;
  registeredAt: string;
  loginAt: string;
}

export async function getMyProfile(req: Request, res: Response) {
  try {
    const { username, name, iat } = req.token;
    const user = await UserModel.findOne({ username });
    if (!user) {
      /**
       * Only case this happens is when a user has logged in
       * in the past, and the user is somehow deleted from database.
       */
      res.status(HttpStatus.NotFound).json({
        message: `User ${username} not found`,
      });
      return;
    }
    const response: GetMyProfileResponse = {
      username,
      name,
      registeredAt: user.createdAt.toISOString(),
      loginAt: new Date(iat * 1000).toISOString(),
    };
    res.status(HttpStatus.OK).json(response);
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
