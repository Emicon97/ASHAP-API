import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../types';

@Injectable()
export class RefreshInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data: AuthResponse) => {
        const res = context.switchToHttp().getResponse();

        res.header('Authorization', `Bearer ${data.accessToken}`);
        res.header('refresh', `Bearer ${data.refreshToken}`);

        delete data.accessToken;
        delete data.refreshToken;
        return data;
      }),
    );
  }
}
