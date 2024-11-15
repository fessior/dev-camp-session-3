import { Document, model, Schema, Types } from 'mongoose';

export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Todo = Document & {
  user: Types.ObjectId;
  title: string;
  description: string;

  status: TodoStatus;

  /**
   * Audit fields for creation and update time
   * This should be auto-managed by Mongoose
   */
  createdAt: Date;
  updatedAt: Date;
};

const todoSchema = new Schema<Todo>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TodoStatus),
      default: TodoStatus.TODO,
    },
  },
  { timestamps: true },
);

export const TodoModel = model<Todo>('Todo', todoSchema);
