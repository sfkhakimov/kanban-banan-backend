import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileEntity } from 'modules/file/file.entity'
import { MulterModule } from '@nestjs/platform-express'
import { FILES_PATH } from 'config/env'
import { CardModule } from 'modules/card/card.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([FileEntity]),
        MulterModule.register({
            dest: FILES_PATH,
        }),
        CardModule,
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}
