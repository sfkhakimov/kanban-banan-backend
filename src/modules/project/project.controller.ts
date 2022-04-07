import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'
import { ProjectService } from 'modules/project/project.service'
import { PaginationQueryType } from 'common/types/PaginationType'
import { CreateProjectDto } from 'modules/project/dto/createProject.dto'

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findProjects(
        @Request() req: ExpressRequestInterface,
        @Param() params: PaginationQueryType,
    ) {
        return await this.projectService.findProjects(req.user, params)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findProject(
        @Request() req: ExpressRequestInterface,
        @Param('id') id: number,
    ) {
        return await this.projectService.findProject(req.user, id)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async createProject(
        @Body() body: CreateProjectDto,
        @Request() req: ExpressRequestInterface,
    ) {
        return await this.projectService.createProject(body, req.user)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async updateProject(
        @Param('id') id: number,
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateProjectDto,
    ) {
        return await this.projectService.updateProject(id, body, req.user)
    }
}
