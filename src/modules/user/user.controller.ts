import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
    Request,
    ValidationPipe,
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { CreateUserDto } from 'modules/user/dto/createUserDto'
import { UserInterface } from 'modules/user/types/user.interface'
import { JwtAuthGuard } from 'modules/auth/jwt.auth.guard'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'

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
}
