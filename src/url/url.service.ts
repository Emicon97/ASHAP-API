import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url.schema';
import { FilterQuery, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UrlResponse } from './types/url-response.type';

@Injectable()
export class UrlService {
  url: string;

  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('ASHAP');
  }

  async create(
    { longLink, custom }: CreateUrlDto,
    hash: string,
  ): Promise<UrlResponse> {
    const shortLink = new URL(`${custom || ''}/${hash}`, this.url);

    try {
      const { _id } = await this.urlModel.create({
        longLink,
        shortLink: shortLink.toString(),
        key: hash,
        ...(custom && { custom }),
      });

      return { _id, shortLink: shortLink.toString() };
    } catch (error) {
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

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
