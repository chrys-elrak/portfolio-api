import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './models/Project';
import { Image, ImageSchema } from './models/Image';
import { ProjectService } from './services/project.service';
import { ProjectController } from 'src/public/controllers/project.controller';
import { ConfigModule } from '@nestjs/config';

const models = [
  {
    name: Project.name,
    schema: ProjectSchema,
  },
  {
    name: Image.name,
    schema: ImageSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(models),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [MongooseModule.forFeature(models), ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class CommonModule {}
