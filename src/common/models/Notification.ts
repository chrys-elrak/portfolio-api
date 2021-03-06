import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Notification {
    @Prop({
      required: true,
      type: String
    })
    title: string;
    @Prop({
      default: false,
      type: Boolean
    })
    seen?: boolean;
    @Prop({
      default: Date.now,
      type: Date
    })
    date?: Date;
    @Prop({
      type: Object,
      default: {}
    })
    content: any;
}

export type NotificationDocument = Notification & mongoose.Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);