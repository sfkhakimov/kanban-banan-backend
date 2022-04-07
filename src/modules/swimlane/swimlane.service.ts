import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { Repository } from 'typeorm'
import { UserInterface } from 'modules/user/types/user.interface'
import { CreateSwimlaneDto } from 'modules/swimlane/dto/createSwimlane.dto'
import { ProjectService } from 'modules/project/project.service'
import { ENTITY_NOT_FOUND } from 'common/constants/errors'

@Injectable()
export class SwimlaneService {
    constructor(
        @InjectRepository(SwimlaneEntity)
        private readonly swimlaneRepository: Repository<SwimlaneEntity>,
        private readonly projectService: ProjectService,
    ) {}

    async createSwimlane(
        user: UserInterface,
        body: CreateSwimlaneDto,
        id: number,
    ) {
        const findProject = await this.projectService.findProject(user, id)

        if (!findProject) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const swimlane = new SwimlaneEntity()

        Object.assign(swimlane, body)

        swimlane.project = findProject

        return await this.swimlaneRepository.save(swimlane)
    }
}
