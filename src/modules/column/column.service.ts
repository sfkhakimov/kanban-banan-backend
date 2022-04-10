import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ColumnEntity } from 'modules/column/column.entity'
import { Repository } from 'typeorm'
import { CreateColumnDto } from 'modules/column/dto/createColumn.dto'
import { UserInterface } from 'modules/user/types/user.interface'
import { ProjectService } from 'modules/project/project.service'
import { ENTITY_NOT_FOUND, ERROR_FORBIDDEN } from 'common/constants/errors'

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
        private readonly projectService: ProjectService,
    ) {}

    async createColumn(id: number, body: CreateColumnDto, user: UserInterface) {
        const findProject = await this.projectService.findProjectById(
            id,
            user.id,
        )

        const column = new ColumnEntity()

        Object.assign(column, body)

        column.project = findProject
        column.author = user

        return await this.columnRepository.save(column)
    }

    async updateColumn(id: number, body: CreateColumnDto, user: UserInterface) {
        const column = await this.columnRepository.findOne(
            { id },
            { relations: ['author'] },
        )

        if (!column) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        if (column.author.id !== user.id) {
            throw new HttpException(ERROR_FORBIDDEN, HttpStatus.FORBIDDEN)
        }

        Object.assign(column, body)

        return await this.columnRepository.save(column)
    }

    async findColumns(id: number, user: UserInterface) {
        const findProject = await this.projectService.findProjectById(
            id,
            user.id,
        )

        const { columns } = findProject

        return columns
    }

    async deleteColumn(id: number, user: UserInterface) {
        const findColumn = await this.columnRepository.findOne(
            { id },
            { relations: ['author'] },
        )

        if (!findColumn) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        if (findColumn.author.id !== user.id) {
            throw new HttpException(ERROR_FORBIDDEN, HttpStatus.FORBIDDEN)
        }

        await this.columnRepository.delete(id)

        return { success: true }
    }
}
