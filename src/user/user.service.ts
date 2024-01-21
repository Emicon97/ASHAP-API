import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto);
    } catch (error) {
      if (error?.code === 11000)
        throw new BadRequestException('The email is already registered.');
      throw new BadGatewayException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: FilterQuery<User>, select?: string) {
    const user = await this.userModel.findOne(query).select(select);

    return user;
  }

  async addUrl(user: User, url: ObjectId) {
    await user.updateOne({ $push: { urls: url } }, { new: true });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
