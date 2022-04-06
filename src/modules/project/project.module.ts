import { Module } from '@nestjs/common'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectEntity } from 'modules/project/project.entity'
import { UserModule } from 'modules/user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UserModule],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
