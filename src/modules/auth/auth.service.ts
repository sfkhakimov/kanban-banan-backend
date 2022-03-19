import { Injectable } from '@nestjs/common'
import { UserService } from 'modules/user/user.service'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(name: string, pass: string) {
        const user = await this.userService.getUser()
    }
}
