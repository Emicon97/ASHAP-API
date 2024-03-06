import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
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
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/user/schemas/user.schema';

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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@GetUser() user: User<string>, @Param('id') id: string) {
    if (!user.collections.some((e: string) => e.toString() === id)) {
      throw new ForbiddenException('You have no permission to delete this collection.');
    }

    const collections = user.collections.filter((e) => e.toString() !== id);
    await this.userService.update(user, { collections });
    return await this.urlCollectionService.delete(id);
  }
}
