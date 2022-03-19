import { Module } from '@nestjs/common'
import { UserModule } from 'modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../ormConfig'
import { AuthModule } from 'modules/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forRoot(ormConfig), UserModule, AuthModule],
})
export class AppModule {}
