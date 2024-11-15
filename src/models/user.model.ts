import { Document, model, Schema } from 'mongoose';

export type User = Document & {
  username: string;
  password: string;
  name: string;

  /**
   * Audit fields for creation and update time
   * This should be auto-managed by Mongoose
   */
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
