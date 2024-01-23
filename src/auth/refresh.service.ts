import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateRefreshToken, JwtPayload, RefreshPayload } from './types';
import { Refresh } from './schemas/refresh.schema';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectModel(Refresh.name, 'DIARY')
    private readonly refreshModel: Model<Refresh>,
  ) {}

  async generateRefreshToken(payload: JwtPayload, newUser?: boolean) {
    const refreshPayload: RefreshPayload = {
      ...payload,
      key: this.authService.generateId(),
    };

    const refresh = this.jwtService.sign(refreshPayload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('REFRESH_SECRET'),
    });

    try {
      const token = refreshPayload.key;
      if (newUser) await this.createRefreshToken({ userId: payload.id, token });
      else await this.updateRefreshToken({ userId: payload.id, token });
    } catch (error) {
      console.error('Authentication error ', error);
      throw new BadGatewayException();
    }

    return refresh;
  }

  // async handleRefreshToken(token: string): Promise<TokenResponse> {
  async handleRefreshToken({ id, key }: RefreshPayload) {
    const error = new NotFoundException('Could not revalidate session.');
    const userTokens = await this.findRefreshTokens(id);
    if (!userTokens) throw error;

    const validToken: string[] = [];
    const invalidTokens: string[] = [];

    userTokens.token.forEach((refresh) => {
      if (key === refresh) validToken.push(refresh);
      else invalidTokens.push(refresh);
    });

    if (!validToken.length) throw error;

    await userTokens.updateOne({ token: invalidTokens });
  }

  private async createRefreshToken(refresh: CreateRefreshToken) {
    try {
      await this.refreshModel.create(refresh);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }

  private async updateRefreshToken({ userId, token }: CreateRefreshToken) {
    try {
      const refresh = await this.refreshModel.findOneAndUpdate(
        { userId },
        { $push: { token } },
      );

      if (!refresh) await this.createRefreshToken({ userId, token });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  private async findRefreshTokens(userId: ObjectId) {
    return await this.refreshModel.findOne({ userId });
  }
}
