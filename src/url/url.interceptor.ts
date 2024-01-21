import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { validateCreated } from './utils/validate-created';

@Injectable()
export class UrlInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const ctx = context.switchToHttp();
        const user: User = ctx.getRequest().user;

        validateCreated(data, ctx);

        if (user) {
          try {
            await this.userService.addUrl(user, data._id);
          } catch (error) {
            return {
              ...data,
              message: "Could not save url in user's storage.",
            };
          }
        }

        return data;
      }),
    );
  }
}
