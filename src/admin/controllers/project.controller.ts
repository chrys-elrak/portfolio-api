import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IResponse } from 'src/common/interfaces/IResponse';
import { ProjectService } from 'src/common/services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { JwtAuthGuard } from '../jwt.auth-guard';

@UseGuards(JwtAuthGuard)
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
    
    @Delete(['/delete/:id', '/:id'])
    async deleteProject(@Param() params: {id: string}) {
        if (isValidObjectId(params.id)) {
            this.projectService.delete(params.id);
            return {
                success: true,
                message: 'Project deleted successfully'
            } as IResponse<any>;
        }
        throw new NotFoundException('Project not found');
    }
}
