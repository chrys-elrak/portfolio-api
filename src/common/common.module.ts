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
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { Notification, NotificationSchema } from './models/Notification';
import { NotificationService } from './services/notification.service';

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
  {
    name: Notification.name,
    schema: NotificationSchema,
  },
]);

@Module({
  imports: [
    mongooseFeatures,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './uploads'
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY
    })
  ],
  exports: [mongooseFeatures, ProjectService, NotificationService],
  controllers: [ProjectController, MessageController],
  providers: [ProjectService, MessageService, NotificationService],
})
export class CommonModule {}
