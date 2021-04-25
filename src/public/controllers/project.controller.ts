import { Controller, Get } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/IResponse';
import { Project } from 'src/common/models/Project';
import { ProjectService } from 'src/common/services/project.service';

@Controller()
export class ProjectController { 

    constructor(private readonly projectService: ProjectService) {}

    @Get('projects')
    async getProjects() {
        return {
            data: await this.projectService.getAll(),
           success: true 
        } as IResponse<Project[]>;
    }

}
