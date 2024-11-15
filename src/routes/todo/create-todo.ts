import { HttpStatus } from '@/constants';
import { Todo, TodoModel, User, UserModel } from '@/models';
import { Request, Response } from 'express';
import { z } from 'zod';

export const createTodoItemSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
});

type CreateTodoItemBody = z.infer<typeof createTodoItemSchema>;

interface CreateTodoItemResponse {
  id: string;
  /**
   * Username of the todo item owner
   */
  createdBy: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function mapCreateTodoItemResponse(
  todo: Todo,
  owner: User,
): CreateTodoItemResponse {
  return {
    id: todo._id.toString(),
    createdBy: owner.username,
    title: todo.title,
    description: todo.description,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}

export async function createTodoItem(req: Request, res: Response) {
  try {
    const { title, description } = req.body as CreateTodoItemBody;
    const { username } = req.token;
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

    const todo = new TodoModel({
      title,
      description,
      user: user._id,
    });
    await todo.save();

    res.status(HttpStatus.Created).json(mapCreateTodoItemResponse(todo, user));
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
