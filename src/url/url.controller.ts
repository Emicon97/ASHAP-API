import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Redirect,
  NotFoundException,
  InternalServerErrorException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { KeyService } from 'src/common/key.service';
import { UrlResponse } from './types/url-response.type';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { OptionalUserGuard } from 'src/auth/guards/optional-user.guard';

@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly keyService: KeyService,
  ) {}

  @UseInterceptors(UrlInterceptor)
  @UseGuards(OptionalUserGuard)
  @Post('url')
  async create(@Body() createUrlDto: CreateUrlDto): Promise<UrlResponse> {
    try {
      const exists = await this.urlService.findOne(createUrlDto);
      if (exists) {
        const { id, shortLink } = exists;

        return { id, shortLink, created: false };
      }

      const hash = await this.keyService.generate();

      return await this.urlService.create(createUrlDto, hash);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Redirect()
  @Get([':key', ':custom/:key'])
  async findOne(@Param('key') key: string) {
    try {
      const { longLink } = await this.urlService.findOne({ key });
      return { url: longLink };
    } catch (error) {
      if (error instanceof TypeError) throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
