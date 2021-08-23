import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
  Get,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { isValidObjectId } from 'mongoose';
import { IResponse } from 'src/common/interfaces/IResponse';
import { ProjectService } from 'src/common/services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { JwtAuthGuard } from '../jwt.auth-guard';
import { diskStorage } from 'multer';
import * as crypto from 'crypto';
import { ImageService } from '../services/image.service';
import { Project } from 'src/common/models/Project';

@UseGuards(JwtAuthGuard)
@Controller('/admin/projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly imageService: ImageService,
  ) {}

  @Get('/')
  async getProjects() {
    return await this.projectService.findAll()
  }

  @Post(['/create', '/'])
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: process.env.SHARED_FOLDER,
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${crypto.randomBytes(50).toString('hex')}.${fileExt}`);
        },
      }),
    }),
  )
  async createProject(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProjectDto,
  ): Promise<IResponse<Project>> {
    const images = await this.imageService.createImage(files);
    const imageIds = images.map((image) => image.id);
    const project = await this.projectService.create(body, imageIds);
    return {
      success: true,
      message: 'Project created successfully',
      data: project
    } as IResponse<Project>;
  }

  @Put(['/update/:id', '/:id'])
  async updateProject(
    @Param() params: { id: string },
    @Body() body,
  ) {
    return this.projectService.update(params.id, body);
  }

  @Delete(['/delete/:id', '/:id'])
  async deleteProject(@Param() params: { id: string }) {
    if (isValidObjectId(params.id)) {
      return this.projectService.delete(params.id);
    }
    throw new NotFoundException('Project not found');
  }
}
