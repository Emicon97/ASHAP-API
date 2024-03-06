import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

export const GetUser = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const user: User<string> = ctx.switchToHttp().getRequest().user;

  if (!user) throw new InternalServerErrorException('User not found in request.');

  return user;
});
