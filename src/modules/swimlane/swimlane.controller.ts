import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
    Param,
    Put,
    Get,
} from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { SwimlaneService } from 'modules/swimlane/swimlane.service'
import { CreateSwimlaneDto } from 'modules/swimlane/dto/createSwimlane.dto'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'

@Controller()
export class SwimlaneController {
    constructor(private readonly swimlaneService: SwimlaneService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Get('swimlane/:id')
    async findSwimlaneById(
        @Request() req: ExpressRequestInterface,
        @Param('id') id: number,
    ) {
        return await this.swimlaneService.findSwimlaneById(req.user, id)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('swimlane/:id')
    async createSwimlane(
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateSwimlaneDto,
        @Param('id') id: number,
    ) {
        return await this.swimlaneService.createSwimlane(req.user, body, id)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Put('swimlane/:id')
    async updateSwimlane(
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateSwimlaneDto,
        @Param('id') id: number,
    ) {
        return await this.swimlaneService.updateSwimlane(req.user, body, id)
    }
}
