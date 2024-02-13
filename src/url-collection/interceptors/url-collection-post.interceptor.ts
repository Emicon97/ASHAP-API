import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { User } from 'src/user/schemas/user.schema';
import { UrlCollection } from '../schemas/url-colllection.schema';

@Injectable()
export class UrlCollectionPostInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const user: User = ctx.getRequest().user;
    const body = ctx.getRequest().body;

    body.owner = user.id;

    return next.handle().pipe(
      map(async (collection: UrlCollection) => {
        if (!collection.owner) ctx.getResponse().status(200);
        return collection;
      }),
    );
  }
}
