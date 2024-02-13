import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export function validateCreated(val: any, ctx: HttpArgumentsHost) {
  if (val.created === false) {
    delete val.created;
    ctx.getResponse().status(200);
  }
}
