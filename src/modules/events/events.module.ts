import { Module } from '@nestjs/common'
import { EventsGateway } from 'modules/events/events.gateway'
import { AuthModule } from 'modules/auth/auth.module'
import { ProjectModule } from 'modules/project/project.module'

@Module({
    imports: [AuthModule, ProjectModule],
    providers: [EventsGateway],
    exports: [EventsGateway],
})
export class EventsModule {}
