import { NotFoundException } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IResponse } from 'src/common/interfaces/IResponse';
import { Project } from 'src/common/models/Project';
import { ProjectService } from 'src/common/services/project.service';


@Controller('/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  async getProjects(): Promise<IResponse<Project[]>> {
    return {
      data: await this.projectService.findAll(),
      success: true,
    } as IResponse<Project[]>;
  }

  @Get('/:id')
  async getOne(@Param() params: {id: string}): Promise<IResponse<Project>> | never {
       if (isValidObjectId(params.id)) {
        return {
            data: await this.projectService.findOneById(params.id),
            success: true,
          } as IResponse<Project>;
       }
       throw new NotFoundException('Project not found');
  }
}