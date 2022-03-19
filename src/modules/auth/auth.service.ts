import { Injectable } from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { compare } from 'bcrypt'
import { UserInterface } from 'modules/user/types/user.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.getUserByEmail(email)

        if (!user) return null

        const isCorrectPassword = await compare(pass, user.password)

        if (!isCorrectPassword) return null

        delete user.password

        return user
    }

    async generateToken(user: UserInterface) {
        return {
            access_token: this.jwtService.sign({ ...user }),
        }
    }
}
