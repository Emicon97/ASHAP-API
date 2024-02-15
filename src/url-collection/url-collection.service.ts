import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUrlCollectionDto } from './dto/create-url-collection.dto';
import { UrlCollection } from './schemas/url-colllection.schema';
import { UrlCollectionDto } from './dto/update-url-collection.dto';
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

  async addUrlToCollection(collection: UrlCollection, url: UrlData) {
    const repeated = collection.urls.find(
      (e) => e.url.id === url.url && e.name === url.name,
    );

    if (repeated) return;
    await collection.updateOne({
      $addToSet: { urls: url },
    });
  }

  async update({ _id, ...rest }: Partial<UrlCollectionDto>) {
    await this.urlCollectionModel.findOneAndUpdate({ _id }, rest, {
      new: true,
    });
  }
}
