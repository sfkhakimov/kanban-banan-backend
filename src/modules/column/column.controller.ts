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
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'
import { CreateColumnDto } from 'modules/column/dto/createColumn.dto'
import { ColumnService } from 'modules/column/column.service'

@Controller()
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @UseGuards(JwtAuthGuard)
    @Get('columns/:id')
    async findColumns(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: ExpressRequestInterface,
    ) {
        return await this.columnService.findColumns(id, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('column/:id')
    async createColumn(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateColumnDto,
    ) {
        return await this.columnService.createColumn(id, body, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Put('column/:id')
    async updateColumn(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: ExpressRequestInterface,
        @Body() body: CreateColumnDto,
    ) {
        return await this.columnService.updateColumn(id, body, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('column/:id')
    async deleteColumn(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: ExpressRequestInterface,
    ) {
        return await this.columnService.deleteColumn(id, req.user)
    }
}
