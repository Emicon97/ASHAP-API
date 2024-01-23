import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';

import { RefreshPayload } from '../types';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: RefreshPayload): Promise<RefreshPayload> {
    const { id, key } = payload;

    const user = await this.userModel.findById(id);

    if (!user) throw new UnauthorizedException('Invalid user credentials.');
    if (!user.isActive)
      throw new ForbiddenException(
        'You are trying to log in with a user that is not currently active.',
      );

    return { id: user._id, key };
  }
}
