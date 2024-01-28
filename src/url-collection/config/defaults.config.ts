import { Availability } from '../types';

type Defaults = {
  NAME: string;
  AVAILABILITY: Availability;
};

export const defaults: Defaults = {
  NAME: 'Uncategorized',
  AVAILABILITY: 'PRIVATE',
};
