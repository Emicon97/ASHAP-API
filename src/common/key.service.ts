import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Url } from 'src/url/schemas/url.schema';

@Injectable()
export class KeyService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async isRepeatedKey(key: string): Promise<boolean> {
    const isRepeated = await this.urlModel.findOne({ key });
    return isRepeated ? true : false;
  }

  async generate() {
    const key = nanoid(7);
    return (await this.isRepeatedKey(key)) ? await this.generate() : key;
  }
}
