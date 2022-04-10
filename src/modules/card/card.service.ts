import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from 'modules/card/card.entity'
import { Repository } from 'typeorm'
import { CreateCardDto } from 'modules/card/dto/createCard.dto'
import { UserInterface } from 'modules/user/types/user.interface'
import { ENTITY_NOT_FOUND, ERROR_FORBIDDEN } from 'common/constants/errors'
import { UpdateCardDto } from 'modules/card/dto/updateCard.dto'
import { ResponseType } from 'common/types/ResponseType'
import { SwimlaneService } from 'modules/swimlane/swimlane.service'

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        private readonly swimlaneService: SwimlaneService,
    ) {}

    async getCard(id: number, user: UserInterface): Promise<CardEntity> {
        const card = await this.cardRepository.findOne(
            { id },
            { relations: ['author', 'fields'] },
        )

        if (card.author.id !== user.id) {
            throw new HttpException(ERROR_FORBIDDEN, HttpStatus.FORBIDDEN)
        }

        return card
    }

    async createCard(
        createCardDto: CreateCardDto,
        user: UserInterface,
        id: number,
    ): Promise<CardEntity> {
        const swimlane = await this.swimlaneService.findSwimlaneById(user, id)

        if (!swimlane) {
            throw new HttpException(ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const card = new CardEntity()

        Object.assign(card, createCardDto)

        card.author = user
        card.swimlane = swimlane
        card.fields = [...swimlane.project.fields]
        card.project = swimlane.project

        return await this.cardRepository.save(card)
    }

    async updateCard(updateCardDto: UpdateCardDto): Promise<CardEntity> {
        return await this.cardRepository.save(updateCardDto)
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
