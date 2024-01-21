import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlMongooseModule } from './schemas/url.schema';
import { CommonModule } from 'src/common/common.module';
import { KeyService } from 'src/common/key.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, UrlMongooseModule, CommonModule, UserModule],
  controllers: [UrlController],
  providers: [UrlService, KeyService],
})
export class UrlModule {}
