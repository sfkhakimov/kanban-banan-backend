import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { Repository } from 'typeorm'
import { UserInterface } from 'modules/user/types/user.interface'
import { CreateSwimlaneDto } from 'modules/swimlane/dto/createSwimlane.dto'

@Injectable()
export class SwimlaneService {
    constructor(
        @InjectRepository(SwimlaneEntity)
        private readonly swimlaneRepository: Repository<SwimlaneEntity>,
    ) {}

    async createSwimlane(user: UserInterface, body: CreateSwimlaneDto) {}
}
