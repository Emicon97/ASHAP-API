import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Refresh extends Document {
  @Prop()
  token: string[];

  @Prop({ unique: true, index: true })
  userId: string;
}

const RefreshSchema = SchemaFactory.createForClass(Refresh);

export const RefreshMongooseModule = MongooseModule.forFeature(
  [
    {
      name: Refresh.name,
      schema: RefreshSchema,
    },
  ],
  'DIARY',
);
