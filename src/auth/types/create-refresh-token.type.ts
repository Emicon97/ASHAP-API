import { ObjectId } from 'mongoose';

export type CreateRefreshToken = {
  userId: ObjectId;
  token: string;
};
