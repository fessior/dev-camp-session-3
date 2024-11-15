import { bodyValidation } from '@/utils/body-validation';
import { Router } from 'express';
import { signup, signupBodySchema } from './signup';
import { login, loginBodySchema } from './login';

const authRouter = Router();

authRouter.post('/signup', bodyValidation(signupBodySchema), signup);

authRouter.post('/login', bodyValidation(loginBodySchema), login);

export { authRouter };
