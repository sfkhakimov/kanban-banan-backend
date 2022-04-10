import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityFieldEntity } from 'modules/entity-field/entity-field.entity'
import { Repository } from 'typeorm'
import { CreateFieldDtoDto } from 'modules/entity-field/dto/createFieldDto.dto'

@Injectable()
export class EntityFieldService {
    constructor(
        @InjectRepository(EntityFieldEntity)
        private readonly entityFieldRepository: Repository<EntityFieldEntity>,
    ) {}
}
