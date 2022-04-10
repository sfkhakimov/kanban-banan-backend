import { Module } from '@nestjs/common'
import { ColumnController } from './column.controller'
import { ColumnService } from './column.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ColumnEntity } from 'modules/column/column.entity'
import { ProjectModule } from 'modules/project/project.module'

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity]), ProjectModule],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule {}
