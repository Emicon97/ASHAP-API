import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { UrlResponse } from '../types/url-response.type';

export function validateCreated(val: UrlResponse, ctx: HttpArgumentsHost) {
  if (val.created === false) {
    delete val.created;
    ctx.getResponse().status(200);
  }
}
