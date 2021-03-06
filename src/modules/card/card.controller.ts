import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { CardService } from 'modules/card/card.service'
import { CreateCardDto } from 'modules/card/dto/createCard.dto'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'
import { UpdateCardDto } from 'modules/card/dto/updateCard.dto'
import { CardEntity } from 'modules/card/card.entity'
import { ResponseType } from 'common/types/ResponseType'

@Controller()
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(JwtAuthGuard)
    @Get('card/:id')
    async getCard(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: ExpressRequestInterface,
    ): Promise<CardEntity> {
        return await this.cardService.getCard(id, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('card')
    @UsePipes(new ValidationPipe())
    async createCard(
        @Request() req: ExpressRequestInterface,
        @Body() createCardDto: CreateCardDto,
    ): Promise<CardEntity> {
        return this.cardService.createCard(createCardDto, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Put('card/:id')
    @UsePipes(new ValidationPipe())
    async updateCard(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateCardDto,
        @Request() req: ExpressRequestInterface,
    ): Promise<CardEntity> {
        return await this.cardService.updateCard(id, updateDto, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('card/:id')
    async deleteCard(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseType> {
        return await this.cardService.deleteCard(id)
    }
}
