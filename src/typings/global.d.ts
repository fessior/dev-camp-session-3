import { TokenData } from '@/auth';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
    interface User {
      token: TokenData;
    }
  }
}
