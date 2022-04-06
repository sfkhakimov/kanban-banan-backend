import {
    Controller,
    Param,
    ParseEnumPipe,
    ParseIntPipe,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'modules/file/file.service'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { FileTypeEnum } from 'modules/file/constants/enum'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':type/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Request() req: ExpressRequestInterface,
        @Param('type', new ParseEnumPipe(FileTypeEnum)) type: FileTypeEnum.Card,
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.fileService.uploadFile(file, type, id, req.user)
    }
}
