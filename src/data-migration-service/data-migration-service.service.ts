import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class DataMigrationServiceService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async migrateData() {
    const users = await this.userModel.find().exec();

    // for (const user of users) {
    //   const newData = {
    //     collections: user.urls,
    //   };
    // }
  }
}
