import { Module } from '@nestjs/common'
import { AuthService } from 'modules/auth/auth.service'
import { AuthController } from 'modules/auth/auth.controller'
import { UserModule } from 'modules/user/user.module'

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
