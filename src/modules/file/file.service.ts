import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileEntity } from 'modules/file/file.entity'
import { Repository } from 'typeorm'
import { FileTypeEnum } from 'modules/file/constants/enum'
import { CardService } from 'modules/card/card.service'
import { UserInterface } from 'modules/user/types/user.interface'

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        private readonly cardService: CardService,
    ) {}

    getProvider(type: FileTypeEnum) {
        const providers = {
            [FileTypeEnum.Card]: this.cardService,
        }

        return providers[type]
    }

    async uploadFile(
        file: Express.Multer.File,
        type: FileTypeEnum,
        id: number,
        user: UserInterface,
    ) {
        const newFile = new FileEntity()

        newFile.name = file.originalname
        newFile.url = file.path
        newFile.type = type

        await this.fileRepository.save(newFile)

        return 'Загрузка файла'
    }
}
