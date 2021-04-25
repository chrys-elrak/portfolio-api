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
}

export type MessageDocument = Message & mongoose.Document;
export const MessageSchema = SchemaFactory.createForClass(Message);