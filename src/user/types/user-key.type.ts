import { User, UserSchema } from '../schemas/user.schema';

export type UserKey = keyof User;

export const userKeys: UserKey[] = (() => {
  const keys: UserKey[] = [];
  const user = UserSchema;

  for (const key in user.obj) key !== 'password' && keys.push(key as keyof User);
  return keys;
})();
