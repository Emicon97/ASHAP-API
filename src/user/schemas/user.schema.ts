import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';
import { safePassword } from 'src/common/utils';
import { UrlData } from '../types';

@Schema()
export class User extends Document {
  @IsEmail()
  @Prop({ unique: true, set: (s: string) => s.toLowerCase().trim() })
  email: string;

  @IsOptional()
  @Matches(safePassword)
  @Prop({ select: false })
  password?: string;

  @IsBoolean()
  @Prop({ default: true })
  isActive: boolean;

  @IsArray()
  @ValidateNested()
  @Prop({
    type: [{ name: String, url: { type: SchemaTypes.ObjectId, ref: 'Url' } }],
    _id: false,
  })
  urls: UrlData[];

  @Prop({ select: false })
  __v?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserMongooseModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
