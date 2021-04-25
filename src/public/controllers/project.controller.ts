import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProjectController { 

    constructor() {}
    
    @Get('projects')
    getProjects() {

    }

}
