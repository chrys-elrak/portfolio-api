import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { ProjectController } from './controllers/project.controller';
import { User, UserSchema } from './models/User';
import { UserService } from './services/user.service';
import * as brycpt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CommonModule,
    JwtModule.register({
        secret: config.secret,
        signOptions: {
            expiresIn: '60s'
        }
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            console.log('Hello from pre save', this);
            // @ts-ignore
            this.password = brycpt.hashSync(this.password, 10);
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  exports: [JwtModule],
  controllers: [AuthenticationController, ProjectController],
  providers: [UserService, JwtStrategy],
})
export class AdminModule {}
