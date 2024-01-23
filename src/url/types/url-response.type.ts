import { Url } from '../schemas/url.schema';

export type UrlResponse = Pick<Required<Url>, 'shortLink' | 'id'> & {
  created?: boolean;
};
