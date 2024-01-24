import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Blacklisted } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class BlacklistedService {
  constructor(
    @InjectModel(Blacklisted.name, 'DIARY')
    private readonly blacklistedModel: Model<Blacklisted>,
  ) {}

  async destroyAccessToken(token: string) {
    return await this.blacklistedModel.create({ token });
  }

  async checkBlacklisted(token: string) {
    return await this.blacklistedModel.findOne({ token });
  }
}
