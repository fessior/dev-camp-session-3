import { authMiddleware } from '@/auth';
import { Router } from 'express';
import { createTodoItem, createTodoItemSchema } from './create-todo';
import { bodyValidation } from '@/utils/body-validation';

const todoRouter = Router();

todoRouter.post(
  '/',
  authMiddleware,
  bodyValidation(createTodoItemSchema),
  createTodoItem,
);

export { todoRouter };
