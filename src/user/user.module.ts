import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongooseModule } from './schemas/user.schema';
import { UrlCollectionModule } from 'src/url-collection/url-collection.module';

@Module({
  imports: [UserMongooseModule, UrlCollectionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserMongooseModule],
})
export class UserModule {}
