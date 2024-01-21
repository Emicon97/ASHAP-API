import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

@Schema({ timestamps: true })
export class Url extends Document {
  _id: ObjectId;

  @IsUrl()
  @Prop({ required: true })
  longLink: string;

  @IsUrl()
  @Prop({ required: true })
  shortLink: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, index: true })
  key: string;

  @IsOptional()
  @IsString()
  @Prop()
  custom?: string;

  @IsOptional()
  @IsDate()
  @Prop()
  expires?: Date;

  @IsOptional()
  @IsNumber()
  @Prop()
  uses?: number;

  @Prop({ select: false })
  __v?: number;
}

const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index({ longLink: 1, custom: 1 }, { unique: true });

export const UrlMongooseModule = MongooseModule.forFeature([
  {
    name: Url.name,
    schema: UrlSchema,
  },
]);
