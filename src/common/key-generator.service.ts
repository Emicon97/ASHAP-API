import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class KeyGeneratorService {
  generate() {
    return nanoid(7);
  }
}
