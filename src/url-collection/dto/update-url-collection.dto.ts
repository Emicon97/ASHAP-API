import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UpdateUrlCollectionDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PartialType(UrlCollectionDto))
  collections: Partial<UrlCollectionDto>[];
}

export class UrlCollectionDto {
  @IsMongoId()
  _id: ObjectId;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PartialType(UrlData))
  urls: Partial<UrlData>[];
}

class Url {
  @IsMongoId()
  public _id: ObjectId;

  @IsUrl()
  longLink: string;

  @IsString()
  shortLink: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  custom?: string;

  @IsOptional()
  @IsDate()
  expires?: Date;

  @IsOptional()
  @IsNumber()
  uses?: number;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}

class UrlData {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => Url)
  url: Url;
}
