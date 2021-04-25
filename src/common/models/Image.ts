import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Image {
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
    type: Object
  })
  meta: Object;
}

export type ImageDocument = Image & mongoose.Document;
export const ImageSchema = SchemaFactory.createForClass(Image);
