/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { ProjectController } from './controllers/project.controller';
import { User, UserSchema } from './models/User';
import { UserService } from './services/user.service';
import * as brycpt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MessageController } from './controllers/message.controller';
import { MessageService } from 'src/common/services/message.service';
import { ImageService } from './services/image.service';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { Notification, NotificationSchema } from './models/Notification';

@Module({
  imports: [
    CommonModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME
      }
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', function (next) {
            // @ts-ignore
            this.password = brycpt.hashSync(this.password, 10);
            next();
          });
          return UserSchema;
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema
      }
    ])
  ],
  exports: [JwtModule],
  controllers: [AuthenticationController, ProjectController, MessageController, NotificationController],
  providers: [UserService, JwtStrategy, MessageService, ImageService, NotificationService],
})
export class AdminModule { }
