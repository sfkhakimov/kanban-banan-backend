import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
    Request,
    ValidationPipe,
    Put,
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { CreateUserDto } from 'modules/user/dto/createUserDto'
import { UserInterface } from 'modules/user/types/user.interface'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.auth.guard'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'
import { UpdateUserDto } from 'modules/user/dto/updateUserDto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req: ExpressRequestInterface) {
        return await this.userService.getUser(req.user)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserInterface> {
        return await this.userService.createUser(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Put()
    async updateUser(
        @Request() req: ExpressRequestInterface,
        @Body() body: UpdateUserDto,
    ): Promise<UserInterface> {
        return await this.userService.updateUser(body, req.user.id)
    }
}
