import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectEntity } from 'modules/project/project.entity'
import { UserInterface } from 'modules/user/types/user.interface'
import { PaginationQueryType } from 'common/types/PaginationType'
import { CreateProjectDto } from 'modules/project/dto/createProject.dto'
import { UserService } from 'modules/user/user.service'
import { ERROR_FORBIDDEN } from 'common/constants/errors'

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        private readonly userService: UserService,
    ) {}

    async findProjects(user: UserInterface, params: PaginationQueryType) {
        const { limit = 10, page = 1 } = params

        const projects = await this.projectRepository
            .createQueryBuilder()
            .select('project')
            .from(ProjectEntity, 'project')
            .where('project.author.id = :id', { id: user.id })

        const count = await projects.getCount()

        const items = await projects
            .take(page * limit)
            .skip(page * limit - limit)
            .getMany()

        return {
            limit,
            items,
            page,
            count,
        }
    }

    async findProject(user: UserInterface, id: number) {
        return await this.projectRepository
            .createQueryBuilder()
            .select('project')
            .from(ProjectEntity, 'project')
            .where('project.id = :projectId', { projectId: id })
            .andWhere('project.author.id = :userId', { userId: user.id })
            .getOne()
    }

    async createProject(data: CreateProjectDto, user: UserInterface) {
        const project = new ProjectEntity()

        const findUser = await this.userService.getUserById(user.id)

        Object.assign(project, data)

        project.author = findUser

        return await this.projectRepository.save(project)
    }

    async updateProject(
        id: number,
        data: CreateProjectDto,
        user: UserInterface,
    ) {
        const findProject = await this.projectRepository.findOne(
            { id },
            { relations: ['author'] },
        )

        if (findProject.author.id !== user.id) {
            throw new HttpException(ERROR_FORBIDDEN, HttpStatus.FORBIDDEN)
        }

        Object.assign(findProject, data)

        return await this.projectRepository.save(findProject)
    }
}
