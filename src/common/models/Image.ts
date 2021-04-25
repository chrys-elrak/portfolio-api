import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
class ImageClass {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  url: string;
  @Prop({
    default: {},
  })
  meta: any;
}

export type Image = ImageClass & mongoose.Document;
export const ImageSchema = SchemaFactory.createForClass(ImageClass);
