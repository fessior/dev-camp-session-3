import { authMiddleware } from '@/auth';
import { Router } from 'express';
import { createTodoItem, createTodoItemSchema } from './create-todo';
import { bodyValidation } from '@/utils/body-validation';
import { updateTodoItem, updateTodoItemSchema } from './update-todo';
import { getPaginatedTodoItems } from './get-todo';
import { bulkInsertTodoItems } from './bulk-insert';

const todoRouter = Router();

todoRouter.post(
  '/',
  authMiddleware,
  bodyValidation(createTodoItemSchema),
  createTodoItem,
);
todoRouter.post('/bulk', authMiddleware, bulkInsertTodoItems);

todoRouter.patch(
  '/:id',
  authMiddleware,
  bodyValidation(updateTodoItemSchema),
  updateTodoItem,
);

todoRouter.get('/', authMiddleware, getPaginatedTodoItems);

export { todoRouter };
