import { Module } from '@nestjs/common'
import { CardController } from './card.controller'
import { CardService } from './card.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardEntity } from 'modules/card/card.entity'
import { SwimlaneModule } from 'modules/swimlane/swimlane.module'
import { ProjectModule } from 'modules/project/project.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity]),
        SwimlaneModule,
        ProjectModule,
    ],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
