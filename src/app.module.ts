import { Module } from '@nestjs/common'
import { UserModule } from 'modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../ormConfig'
import { AuthModule } from 'modules/auth/auth.module'
import { CardModule } from 'modules/card/card.module'
import { FileModule } from 'modules/file/file.module'
import { SwimlaneModule } from 'modules/swimlane/swimlane.module'
import { ProjectModule } from './modules/project/project.module';
import { EntityFieldModule } from './modules/entity-field/entity-field.module';
import { ColumnModule } from './modules/column/column.module';
import { EventsModule } from './modules/events/events.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        UserModule,
        AuthModule,
        CardModule,
        FileModule,
        SwimlaneModule,
        ProjectModule,
        EntityFieldModule,
        ColumnModule,
        EventsModule,
    ],
})
export class AppModule {}
