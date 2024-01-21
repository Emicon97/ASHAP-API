import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  comparePasswords(password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted);
  }

  getToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
