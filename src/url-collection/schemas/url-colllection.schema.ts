import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsIn, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

import { defaults } from '../config/defaults.config';
import { autoPopulateLead } from 'src/common/utils';
import { UrlData } from 'src/user/types';
import { Availability, availability } from '../types';

@Schema()
export class UrlCollection extends Document {
  @IsString()
  @Prop({ default: defaults.NAME })
  name: string;

  @IsArray()
  @ValidateNested()
  @Prop({ type: [{ name: String, url: { type: SchemaTypes.ObjectId, ref: 'Url' } }] })
  urls?: UrlData[];

  @IsIn(availability)
  @Prop({ default: defaults.AVAILABILITY })
  availability: Availability;

  @Prop()
  allowed?: string[];

  @IsMongoId()
  @Prop({ select: false })
  owner: string;
}

const UrlCollectionSchema = SchemaFactory.createForClass(UrlCollection);

const autoPopulateUrl = autoPopulateLead('urls.url');

UrlCollectionSchema.pre('findOne', autoPopulateUrl).pre('find', autoPopulateUrl);

export const UrlMongooseModule = MongooseModule.forFeature([
  {
    name: UrlCollection.name,
    schema: UrlCollectionSchema,
  },
]);
