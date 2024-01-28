import { Url } from 'src/url/schemas/url.schema';

export type UrlData = { url: Url; name?: string };

export type UrlCollection = { urls: UrlData[]; name: string };
