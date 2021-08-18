import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Message {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    title: string;
    @Prop()
    content: string;
    @Prop({
        default: false
    })
    seen: boolean;
    @Prop({
        default: Date.now
    })
    date: Date;
}

export type MessageDocument = Message & mongoose.Document;
export const MessageSchema = SchemaFactory.createForClass(Message);