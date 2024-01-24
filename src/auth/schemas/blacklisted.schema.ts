import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blacklisted extends Document {
  @Prop()
  token: string;
}

const BlacklistedSchema = SchemaFactory.createForClass(Blacklisted);

export const BlacklistedMongooseModule = MongooseModule.forFeature(
  [
    {
      name: Blacklisted.name,
      schema: BlacklistedSchema,
    },
  ],
  'DIARY',
);
