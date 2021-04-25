import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { ProjectController } from './controllers/project.controller';
import { User, UserSchema } from './models/User';
import { UserService } from './services/user.service';

@Module({
    imports: [CommonModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthenticationController, ProjectController],
    providers: [UserService],
})
export class AdminModule {}
