import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Image } from './Image';
/*
export interface Project {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    projectCreatedAt: Date;
    projectUrl: string;
    projectImage: any[];
    createdAt: Date;
}


export const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    description: {
        type: String,
        required: true
    },
    projectCreatedAt: {
        required: true,
        type: Date
    },
    projectUrl: {
        type: String,
        required: true
    },
    projectUrlImage: Array,
});
*/

@Schema()
export class Project {
  @Prop({
    required: true,
  })
  title: string;
  @Prop()
  subtitle?: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop({
    required: true,
  })
  at: Date;
  @Prop({
    required: true,
  })
  url: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Image.name })
  images: Image[];
  @Prop(
    {
      type: Boolean,
      default: false
    }
  )
  published: boolean;
  @Prop({ type: Array })
  comments: { userID: string, comment: string }[];
  @Prop( { type: [mongoose.Types.ObjectId] })
  likes: string[];
}

export type ProjectDocument = Project & mongoose.Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
