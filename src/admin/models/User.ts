import { Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export class User {
    @Prop()
    username: string;
    @Prop()
    password: string;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);