import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Url } from './schemas/url.schema';
import { UrlRequest, UrlResponse } from './types';

@Injectable()
export class UrlService {
  url: string;

  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('ASHAP');
  }

  async create({ longLink, custom }: UrlRequest, hash: string): Promise<UrlResponse> {
    const shortLink = new URL(`${custom || ''}/${hash}`, this.url);

    try {
      const { id } = await this.urlModel.create({
        longLink,
        shortLink: shortLink.toString(),
        key: hash,
        ...(custom && { custom }),
      });

      return { id, shortLink: shortLink.toString() };
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }

  findAll() {
    return `This action returns all url`;
  }

  async findOne(data: FilterQuery<Url>) {
    try {
      const url = await this.urlModel.findOne(data);

      return url;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
