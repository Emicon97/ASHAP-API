import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const OptionalUser = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;

    if (!user)
      throw new InternalServerErrorException('User not found in request.');

    return user;
  },
);
