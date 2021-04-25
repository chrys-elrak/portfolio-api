import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { ProjectController } from './controllers/project.controller';

@Module({
    imports: [CommonModule],
    controllers: [AuthenticationController, ProjectController],
    providers: [],
})
export class AdminModule {}
