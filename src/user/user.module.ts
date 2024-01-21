import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongooseModule } from './schemas/user.schema';

@Module({
  imports: [UserMongooseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserMongooseModule],
})
export class UserModule {}
