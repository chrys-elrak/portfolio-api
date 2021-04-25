import { Body, Controller, Get, Post } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/IResponse';
import { ProjectService } from 'src/common/services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';

@Controller('/admin/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post(['/create', '/'])
    async createProject(@Body() body: CreateProjectDto) {
        this.projectService.create(body);
        return {
            success: true,
            message: 'Project created successfully'
        } as IResponse<any>;
    }
}
