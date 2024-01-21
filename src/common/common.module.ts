import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { UrlMongooseModule } from 'src/url/schemas/url.schema';

@Module({
  imports: [UrlMongooseModule],
  providers: [KeyService],
})
export class CommonModule {}
