import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/admin/dto/create-project.dto';
import { Image } from '../models/Image';
import { Project, ProjectDocument } from '../models/Project';

@Injectable()
export class ProjectService {
constructor(@InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>) {}

async findAll(): Promise<Project[]> {
    return await this.ProjectModel.find({})
    .populate(Image.name, {});
}

async findOneById(id: string): Promise<Project> {
    return await this.ProjectModel.findById(id)
    .populate(Image.name, {});
}

async create(body: CreateProjectDto): Promise<void> {
  await this.ProjectModel.create(body);

}

}
