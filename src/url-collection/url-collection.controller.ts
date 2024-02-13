import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUrlCollectionDto } from './dto/create-url-collection.dto';
import { UrlCollectionPostInterceptor } from './interceptors/url-collection-post.interceptor';
import { UserService } from 'src/user/user.service';

@Controller('url-collection')
export class UrlCollectionController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(UrlCollectionPostInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUrlCollectionDto: CreateUrlCollectionDto) {
    return this.userService.getOrCreateCollection(createUrlCollectionDto);
  }
}
