import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from './schemas/user.schema';
import { QueryFunctions } from 'src/common/types/query-functions.type';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

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

      return user.toObject();
    } catch (error) {
      if (error.path)
        throw new BadRequestException(`Property ${error.path} does not exist.`);
      console.error(error);
    }
  }

  async addUrl(user: User, url: ObjectId) {
    await user.updateOne({ $addToSet: { urls: url } }, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
