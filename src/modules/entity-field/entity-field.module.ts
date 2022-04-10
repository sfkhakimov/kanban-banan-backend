import { Module } from '@nestjs/common'
import { EntityFieldController } from './entity-field.controller'
import { EntityFieldService } from './entity-field.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityFieldEntity } from 'modules/entity-field/entity-field.entity'

@Module({
    imports: [TypeOrmModule.forFeature([EntityFieldEntity])],
    controllers: [EntityFieldController],
    providers: [EntityFieldService],
    exports: [EntityFieldService],
})
export class EntityFieldModule {}
