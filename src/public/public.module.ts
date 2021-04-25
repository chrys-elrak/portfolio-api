import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProjectController } from './controllers/project.controller';

@Module({
    imports: [CommonModule],
    controllers: [ProjectController],
    providers: [],
})
export class PublicModule {}
