import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { validateCreated } from '../utils/validate-created';
import { UrlResponse } from '../types';
import { CreateUrlDto } from '../dto/create-url.dto';

@Injectable()
export class UrlInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const user: User = ctx.getRequest().user;
    const { name, collection }: CreateUrlDto = ctx.getRequest().body;

    delete ctx.getRequest().body.name;
    delete ctx.getRequest().body.collection;

    return next.handle().pipe(
      map(async (data: UrlResponse) => {
        validateCreated(data, ctx);

        if (user) {
          try {
            await this.userService.addUrl(user, { name, url: data.id }, collection);
          } catch (error) {
            console.error(error);
            return {
              ...data,
              message: "Could not save link in user's storage. Please try again.",
            };
          }
        }

        return data;
      }),
    );
  }
}
