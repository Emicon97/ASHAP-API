import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUrlCollectionDto } from './dto/create-url-collection.dto';
import { UrlCollectionPostInterceptor } from './interceptors/url-collection-post.interceptor';
import { UserService } from 'src/user/user.service';
import { UpdateUrlCollectionDto } from './dto/update-url-collection.dto';
import { UrlCollectionPatchInterceptor } from './interceptors/url-collection-patch.interceptor';
import { UrlCollectionService } from './url-collection.service';

@Controller('url-collection')
export class UrlCollectionController {
  constructor(
    private readonly urlCollectionService: UrlCollectionService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(UrlCollectionPostInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUrlCollectionDto: CreateUrlCollectionDto) {
    return this.userService.getOrCreateCollection(createUrlCollectionDto);
  }

  @UseInterceptors(UrlCollectionPatchInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@Body() updateUrlCollectionDto: UpdateUrlCollectionDto) {
    updateUrlCollectionDto.collections.map(
      async (e) => await this.urlCollectionService.update(e),
    );

    return 'Ok';
  }
}
