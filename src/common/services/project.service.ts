import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../models/Project';

@Injectable()
export class ProjectService {
constructor(@InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>) {}

async findAll(): Promise<Project[]> {
    return await this.ProjectModel.find({});
}

async findOneById(id: string): Promise<Project> {
    return await this.ProjectModel.findById(id);
}

}
