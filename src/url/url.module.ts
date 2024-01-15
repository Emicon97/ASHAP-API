import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { KeyGeneratorService } from 'src/common/key-generator.service';

@Module({
  controllers: [UrlController],
  providers: [UrlService, KeyGeneratorService],
})
export class UrlModule {}
