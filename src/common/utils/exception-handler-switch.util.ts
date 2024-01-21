import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export function exceptionHandlerSwitch(status: number, message: string): never {
  switch (status) {
    case 400:
      throw new BadRequestException(message);
    case 401:
      throw new UnauthorizedException(message);
    case 403:
      throw new ForbiddenException(message);
    case 404:
      throw new NotFoundException(message);
    default:
      throw new BadGatewayException();
  }
}
