import { TokenData } from '@/auth';

declare global {
  namespace Express {
    interface Request {
      token: TokenData;
    }
  }
}
