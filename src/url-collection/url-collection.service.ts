import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { defaults } from './config/defaults.config';
import { CreateUrlCollectionDto } from './dto/create-url-collection.dto';
import { UrlCollection } from './schemas/url-colllection.schema';
import { UrlData } from 'src/user/types';

@Injectable()
export class UrlCollectionService {
  constructor(
    @InjectModel(UrlCollection.name)
    private readonly urlCollectionModel: Model<UrlCollection>,
  ) {}

  async create(createUrlCollectionDto: CreateUrlCollectionDto) {
    return await this.urlCollectionModel.create(createUrlCollectionDto);
  }

  async getOrCreateCollection(owner: string, name?: string) {
    const collection: UrlCollection = await this.urlCollectionModel.findOne({
      owner,
      name: name || defaults.NAME,
    });

    if (collection) return collection;

    return await this.create({ owner, name });
  }

  async addUrlToCollection(collection: UrlCollection, url: ObjectId | UrlData) {
    await collection.updateOne({
      $addToSet: { urls: url },
    });
  }
}
