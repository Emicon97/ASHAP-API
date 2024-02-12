import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from './schemas/user.schema';
import { QueryFunctions } from 'src/common/types';
import { UrlData } from './types';
import { UrlCollectionService } from 'src/url-collection/url-collection.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly urlCollectionService: UrlCollectionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = (await this.userModel.create(createUserDto)).toObject();

      delete user.password;
      return user;
    } catch (error) {
      if (error?.code === 11000)
        throw new BadRequestException('The email is already registered.');
      throw new BadGatewayException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: FilterQuery<User>, queryFunctions?: QueryFunctions<User>) {
    try {
      const user = await this.userModel
        .findOne(query)
        .select(queryFunctions?.select)
        .populate(queryFunctions?.populate)
        .exec();

      if (user) return user.toObject();
    } catch (error) {
      if (error.path)
        throw new BadRequestException(`Property ${error.path} does not exist.`);
      console.error(error);
      throw new NotFoundException(
        'Something went wrong when attempting to find the data.',
      );
    }
  }

  async addUrl(user: User, url: ObjectId | UrlData, collectionName: string) {
    const collection = await this.urlCollectionService.getOrCreateCollection(
      user.id,
      collectionName,
    );

    await this.urlCollectionService.addUrlToCollection(collection, url);

    await user.updateOne({ $addToSet: { collections: collection.id } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
