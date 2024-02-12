import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { UrlResponse } from '../types';

export function validateCreated(val: UrlResponse, ctx: HttpArgumentsHost) {
  if (val.created === false) {
    delete val.created;
    ctx.getResponse().status(200);
  }
}
