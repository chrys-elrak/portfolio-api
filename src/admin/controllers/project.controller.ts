import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    
    @Put(['/update/:id', '/:id'])
    async updateProject(@Param() params: {id: string}, @Body() body: CreateProjectDto) {
        this.projectService.update(params.id, body);
        return {
            success: true,
            message: 'Project updated successfully'
        } as IResponse<any>;
    }
}
