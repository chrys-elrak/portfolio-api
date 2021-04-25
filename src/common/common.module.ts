import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './models/Project';
import { Image, ImageSchema } from './models/Image';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { ConfigModule } from '@nestjs/config';
import { Message, MessageSchema } from './models/Message';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { MulterModule } from '@nestjs/platform-express';
const mongooseFeatures = MongooseModule.forFeature([
  {
    name: Project.name,
    schema: ProjectSchema,
  },
  {
    name: Image.name,
    schema: ImageSchema,
  },
  {
    name: Message.name,
    schema: MessageSchema,
  },
]);

@Module({
  imports: [
    mongooseFeatures,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  exports: [mongooseFeatures, ProjectService],
  controllers: [ProjectController, MessageController],
  providers: [ProjectService, MessageService],
})
export class CommonModule {}
