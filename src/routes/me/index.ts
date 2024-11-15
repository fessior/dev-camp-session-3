import { authMiddleware } from '@/auth';
import { Router } from 'express';
import { getMyProfile } from './me';

const meRouter = Router();

meRouter.get('/', authMiddleware, getMyProfile);

export { meRouter };
