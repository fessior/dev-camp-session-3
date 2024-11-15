import { config } from '@/config';
import { sign, verify } from 'jsonwebtoken';

export type TokenData = {
  userId: string;
  username: string;
  name: string;
};

export function signJwtToken(data: TokenData): string {
  return sign(data, config.jwtSecret);
}

export function verifyJwtToken(token: string): TokenData {
  return verify(token, config.jwtSecret) as TokenData;
}
