import { HttpStatus } from '@/constants';
import { Todo, TodoModel } from '@/models';
import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { range } from 'lodash';
import { Types } from 'mongoose';

const FAKE_TODO_COUNT = 5000;

function getFakeTodosWithOwner(ownerId: Types.ObjectId): Todo[] {
  return range(FAKE_TODO_COUNT).map(
    __ =>
      new TodoModel({
        title: faker.music.songName(),
        description: faker.lorem.sentence(),
        user: ownerId,
      }),
  );
}

export async function bulkInsertTodoItems(req: Request, res: Response) {
  try {
    const { userId } = req.token;

    const todos = getFakeTodosWithOwner(new Types.ObjectId(userId));
    await TodoModel.insertMany(todos);

    res.status(HttpStatus.Created).end();
  } catch (err) {
    res.status(HttpStatus.InternalServerError).json({
      message: err.message,
    });
  }
}
