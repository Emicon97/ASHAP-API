import { Module } from '@nestjs/common';
import { UrlCollectionService } from './url-collection.service';
import { UrlCollectionController } from './url-collection.controller';
import { UrlMongooseModule } from './schemas/url-colllection.schema';

@Module({
  imports: [UrlMongooseModule],
  controllers: [UrlCollectionController],
  providers: [UrlCollectionService],
  exports: [UrlCollectionService],
})
export class UrlCollectionModule {}
