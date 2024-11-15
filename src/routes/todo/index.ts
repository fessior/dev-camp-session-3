import { authMiddleware } from '@/auth';
import { Router } from 'express';
import { createTodoItem, createTodoItemSchema } from './create-todo';
import { bodyValidation } from '@/utils/body-validation';
import { updateTodoItem, updateTodoItemSchema } from './update-todo';

const todoRouter = Router();

todoRouter.post(
  '/',
  authMiddleware,
  bodyValidation(createTodoItemSchema),
  createTodoItem,
);

todoRouter.patch(
  '/:id',
  authMiddleware,
  bodyValidation(updateTodoItemSchema),
  updateTodoItem,
);

export { todoRouter };
