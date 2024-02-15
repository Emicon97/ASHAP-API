import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UrlCollection } from '../schemas/url-colllection.schema';
import { UrlData } from 'src/user/types';

@Injectable()
export class UrlCollectionPatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const body = ctx.getRequest().body;

    const collections: UrlData[] = body.collections.map(
      ({ _id, name, urls }: UrlCollection) => {
        return { _id, name, urls };
      },
    );

    body.collections = collections;

    return next.handle();
  }
}
