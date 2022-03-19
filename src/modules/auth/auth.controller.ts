import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from 'modules/auth/local.auth.guard'
import { AuthService } from 'modules/auth/auth.service'
import { ExpressRequestInterface } from 'modules/user/types/userRquest.interface'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req: ExpressRequestInterface,
    ): Promise<{ access_token: string }> {
        return await this.authService.generateToken(req.user)
    }
}
