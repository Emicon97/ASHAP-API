import { Url } from '../schemas/url.schema';

export type UrlResponse = Pick<Required<Url>, 'shortLink' | '_id'> & {
  created?: boolean;
};
