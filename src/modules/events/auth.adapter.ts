import { IoAdapter } from '@nestjs/platform-socket.io'
import { JwtService } from '@nestjs/jwt'
import { INestApplicationContext } from '@nestjs/common'

export class AuthSocketIoAdapter extends IoAdapter {
    private readonly jwtService: JwtService
    constructor(private app: INestApplicationContext) {
        super(app)
        this.jwtService = this.app.get(JwtService)
    }

    createIOServer(port: number, options?: any): any {
        options.allowRequest = async (request, allowFunction) => {
            try {
                const token = request.headers.authorization.split(' ')[1]
                await this.jwtService.verify(token)
                allowFunction(null, true)
            } catch (e) {
                return allowFunction('Unauthorized', false)
            }
        }

        return super.createIOServer(port, options)
    }
}
