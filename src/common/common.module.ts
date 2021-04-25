import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './models/Project';
import { Image, ImageSchema} from './models/Image';
import { ProjectService } from './services/project.service';

const models = [
    {
        name: Project.name,
        schema: ProjectSchema
    },
    {
        name: Image.name,
        schema: ImageSchema
    }
];

@Module({
  imports: [MongooseModule.forFeature(models)],
  exports: [MongooseModule.forFeature(models), ProjectService],
  controllers: [],
  providers: [ProjectService],
})
export class CommonModule {}
