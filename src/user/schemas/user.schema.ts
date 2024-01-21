import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

import { Url } from 'src/url/schemas/url.schema';
import { safePassword } from 'src/common/utils';

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
  @IsMongoId()
  @Prop({ type: SchemaTypes.ObjectId })
  urls: Url[];

  @Prop({ select: false })
  __v?: number;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserMongooseModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
