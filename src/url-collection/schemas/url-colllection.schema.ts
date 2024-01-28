import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsIn, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

import { UrlData } from 'src/user/types';
import { Availability, availability } from '../types';
import { defaults } from '../config/defaults.config';

@Schema()
export class UrlCollection extends Document {
  @IsString()
  @Prop({ default: defaults.NAME })
  name: string;

  @IsArray()
  @ValidateNested()
  @Prop({
    type: [{ name: String, url: { type: SchemaTypes.ObjectId, ref: 'Url' } }],
    _id: false,
  })
  urls?: UrlData[];

  @IsIn(availability)
  @Prop({ default: defaults.AVAILABILITY })
  availability: Availability;

  @Prop()
  accessors?: string;

  @IsMongoId()
  @Prop({ select: false })
  owner: string;
}

const UrlCollectionSchema = SchemaFactory.createForClass(UrlCollection);

const autoPopulateLead = function () {
  this.populate('urls.url');
};

UrlCollectionSchema.pre('findOne', autoPopulateLead).pre('find', autoPopulateLead);

export const UrlMongooseModule = MongooseModule.forFeature([
  {
    name: UrlCollection.name,
    schema: UrlCollectionSchema,
  },
]);
