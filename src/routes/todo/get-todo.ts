import { HttpStatus } from '@/constants';
import { TodoModel, TodoStatus } from '@/models';
import { Request, Response } from 'express';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

interface GetPaginatedTodoItemsResponse {
  page: number;
  pageSize: number;
  todos: {
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;
  }[];
}

export async function getPaginatedTodoItems(req: Request, res: Response) {
  try {
    const { userId } = req.token;

    /* Pagination parameters */
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const pageSize = Number(req.query.pageSize) || DEFAULT_PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const todos = await TodoModel.find(
      { user: userId },
      {},
      {
        skip,
        limit,
        sort: {
          createdAt: -1,
        },
      },
    );

    const response: GetPaginatedTodoItemsResponse = {
      page,
      pageSize,
      todos: todos.map(todo => ({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      })),
    };

    res.status(HttpStatus.OK).json(response);
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
