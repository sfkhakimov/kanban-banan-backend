import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from 'modules/card/card.entity'
import { Repository } from 'typeorm'
import { CreateCardDto } from 'modules/card/dto/createCard.dto'
import { UserInterface } from 'modules/user/types/user.interface'
import { ENTITY_NOT_FOUND, ERROR_FORBIDDEN } from 'common/constants/errors'
import { UpdateCardDto } from 'modules/card/dto/updateCard.dto'
import { ResponseType } from 'common/types/ResponseType'
import { ProjectService } from 'modules/project/project.service'

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        private readonly projectService: ProjectService,
    ) {}

    async getCard(id: number, user: UserInterface): Promise<CardEntity> {
        const card = await this.cardRepository.findOne(
            { id },
            {
                relations: [
                    'author',
                    'fields',
                    'project',
                    'column',
                    'swimlane',
                ],
            },
        )

        if (!card) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        await this.projectService.findProjectById(card.project.id, user.id)

        return card
    }

    async createCard(
        createCardDto: CreateCardDto,
        user: UserInterface,
    ): Promise<CardEntity> {
        const { projectId, swimlaneId, columnId, data } = createCardDto
        const project = await this.projectService.findProjectById(
            projectId,
            user.id,
        )

        const { swimlanes, columns } = project

        const swimlane = swimlanes.find(({ id }) => id === swimlaneId)

        const column = columns.find(({ id }) => id === columnId)

        if (!swimlane || !column) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const card = new CardEntity()

        Object.assign(card, data)

        card.author = user
        card.swimlane = swimlane
        card.column = column
        card.fields = [...project.fields]
        card.project = project

        const savedCard = await this.cardRepository.save(card)

        delete savedCard.project

        return savedCard
    }

    async updateCard(
        id: number,
        updateCardDto: UpdateCardDto,
        user: UserInterface,
    ): Promise<CardEntity> {
        const { swimlaneId, columnId, data } = updateCardDto

        const findCard = await this.cardRepository.findOne(
            { id },
            { relations: ['project', 'swimlane', 'column'] },
        )

        if (!findCard) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const {
            project: { id: projectId },
        } = findCard

        const project = await this.projectService.findProjectById(
            projectId,
            user.id,
        )

        const { swimlanes, columns } = project

        const swimlane = swimlanes.find(({ id }) => id === swimlaneId)

        const column = columns.find(({ id }) => id === columnId)

        if (!swimlane || !column) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        Object.assign(findCard, data)

        findCard.swimlane = swimlane
        findCard.column = column

        return await this.cardRepository.save(findCard)
    }

    async deleteCard(id: number): Promise<ResponseType> {
        const card = await this.cardRepository.findOne({ id })

        if (!card) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        await this.cardRepository.delete(id)

        return { success: true }
    }
}
