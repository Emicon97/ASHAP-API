import { CreateUrlDto } from '../dto/create-url.dto';

export type UrlRequest = Omit<CreateUrlDto, 'name' | 'collection'>;
