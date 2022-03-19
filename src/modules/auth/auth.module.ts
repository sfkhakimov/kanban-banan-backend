import { Module } from '@nestjs/common'
import { AuthService } from 'modules/auth/auth.service'
import { AuthController } from 'modules/auth/auth.controller'
import { UserModule } from 'modules/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'modules/auth/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JWT } from 'config/env'
import { JwtStrategy } from 'modules/auth/jwt.strategy'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JWT,
            signOptions: {
                expiresIn: '15s',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
