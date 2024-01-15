import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), UrlModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
