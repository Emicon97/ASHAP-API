import { Select } from './select.type';

export type QueryFunctions<T> = {
  populate?: string | string[];
  select?: keyof T | Select<T>;
};
