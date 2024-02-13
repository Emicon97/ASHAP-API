import { Module, forwardRef } from '@nestjs/common';
import { UrlCollectionService } from './url-collection.service';
import { UrlCollectionController } from './url-collection.controller';
import { UrlMongooseModule } from './schemas/url-colllection.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UrlMongooseModule, forwardRef(() => UserModule)],
  controllers: [UrlCollectionController],
  providers: [UrlCollectionService],
  exports: [UrlCollectionService],
})
export class UrlCollectionModule {}
