import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
} from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { SwimlaneService } from 'modules/swimlane/swimlane.service'
import { CreateSwimlaneDto } from 'modules/swimlane/dto/createSwimlane.dto'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'

@Controller('swimlanes')
export class SwimlaneController {
    constructor(private readonly swimlaneService: SwimlaneService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createSwimlane(
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateSwimlaneDto,
    ) {
        return await this.swimlaneService.createSwimlane(req.user, body)
    }
}
