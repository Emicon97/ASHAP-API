import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  NotFoundException,
  BadRequestException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { KeyService } from 'src/common/key.service';
import { OptionalUserGuard } from 'src/auth/guard/optional-user.guard';
import { UrlInterceptor } from './url.interceptor';
import { UrlResponse } from './types/url-response.type';

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
    const exists = await this.urlService.findOne(createUrlDto);
    if (createUrlDto.custom && exists) throw new BadRequestException();
    if (exists) {
      const { _id, shortLink } = exists;

      return { _id, shortLink, created: false };
    }

    const hash = await this.keyService.generate();

    return await this.urlService.create(createUrlDto, hash);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
