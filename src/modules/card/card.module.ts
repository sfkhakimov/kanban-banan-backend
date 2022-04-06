import { Module } from '@nestjs/common'
import { CardController } from './card.controller'
import { CardService } from './card.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardEntity } from 'modules/card/card.entity'

@Module({
    imports: [TypeOrmModule.forFeature([CardEntity])],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
