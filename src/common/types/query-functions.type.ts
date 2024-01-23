import { Select } from './select.type';

export type QueryFunctions<T> = {
  select?: Select<T>;
  populate?: string | string[];
};
