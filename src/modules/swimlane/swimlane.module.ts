import { Module } from '@nestjs/common'
import { SwimlaneController } from './swimlane.controller'
import { SwimlaneService } from './swimlane.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'

@Module({
    imports: [TypeOrmModule.forFeature([SwimlaneEntity])],
    controllers: [SwimlaneController],
    providers: [SwimlaneService],
})
export class SwimlaneModule {}
