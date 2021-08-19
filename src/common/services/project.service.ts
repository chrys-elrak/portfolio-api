import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/admin/dto/create-project.dto';
import { Project, ProjectDocument } from '../models/Project';

@Injectable()
export class ProjectService {
constructor(@InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>) {}

async update(id: string, body: CreateProjectDto): Promise<void> {
    await this.ProjectModel.findByIdAndUpdate(id, body);
}

async delete(id: string): Promise<void> {
  await this.ProjectModel.findByIdAndDelete(id);
}

async findAll(): Promise<Project[]> {
    return await this.ProjectModel.find()
    .populate('images');
}

async getAllPublished(): Promise<Project[]> {
  return await this.ProjectModel.find({ published: true })
  .populate('images');
}

async findOneById(id: string): Promise<Project> {
    return await this.ProjectModel.findById(id)
    .populate('images');
}

async create(body: CreateProjectDto, imagesIds: string[]): Promise<Project> {
  return await this.ProjectModel.create({
    ...body,
    images: imagesIds
  });
}

}
