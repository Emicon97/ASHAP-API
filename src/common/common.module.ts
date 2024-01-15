import { Module } from '@nestjs/common';
import { KeyGeneratorService } from './key-generator.service';

@Module({
  providers: [KeyGeneratorService],
})
export class CommonModule {}
