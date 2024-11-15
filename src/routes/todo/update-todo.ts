import { HttpStatus } from '@/constants';
import { Todo, TodoModel, TodoStatus, User, UserModel } from '@/models';
import { Request, Response } from 'express';
import { z } from 'zod';

export const updateTodoItemSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(1000).optional(),
  status: z.nativeEnum(TodoStatus).optional(),
});

type UpdateTodoItemBody = z.infer<typeof updateTodoItemSchema>;

interface UpdateTodoItemResponse {
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

function mapUpdateTodoItemResponse(
  todo: Todo,
  owner: User,
): UpdateTodoItemResponse {
  return {
    id: todo._id.toString(),
    createdBy: owner.username,
    title: todo.title,
    description: todo.description,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}

function mergeUpdateTodoItemBody(todo: Todo, body: UpdateTodoItemBody) {
  if (body.title) todo.title = body.title;
  if (body.description) todo.description = body.description;
  if (body.status) todo.status = body.status;
}

export async function updateTodoItem(req: Request, res: Response) {
  try {
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

    const todo = await TodoModel.findOne({
      _id: req.params.id,
      user: user._id,
    });
    if (!todo) {
      res.status(HttpStatus.NotFound).json({
        message: `Todo item ${req.params.id} not found`,
      });
      return;
    }

    mergeUpdateTodoItemBody(todo, req.body);
    await todo.save();

    res.status(HttpStatus.OK).json(mapUpdateTodoItemResponse(todo, user));
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
