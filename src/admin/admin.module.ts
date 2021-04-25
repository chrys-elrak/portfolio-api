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
console.log(process.env.TOKEN_SECRET);

@Module({
  imports: [
    CommonModule,
    JwtModule.register({
        secret: process.env.TOKEN_SECRET,
        signOptions: {
            expiresIn: process.env.TOKEN_EXPIRES
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
  ],
  exports: [JwtModule],
  controllers: [AuthenticationController, ProjectController],
  providers: [UserService, JwtStrategy],
})
export class AdminModule {}
