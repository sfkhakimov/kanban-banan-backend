import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { NOT_FOUND_USER } from 'common/constants/errors'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException(NOT_FOUND_USER)
        }

        return user
    }
}
