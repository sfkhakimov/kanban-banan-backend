import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { CreateUserDto } from 'modules/user/dto/createUserDto'
import { UserResponseInterface } from 'modules/user/types/userResponse.interface'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUser(): Promise<UserResponseInterface> {
        return await this.userService.getUser()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserResponseInterface> {
        return await this.userService.createUser(createUserDto)
    }
}
