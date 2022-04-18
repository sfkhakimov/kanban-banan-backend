import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketResponseTypes } from 'modules/events/types/SocketResponseTypes'
import { Injectable } from '@nestjs/common'
import { AuthService } from 'modules/auth/auth.service'
import { ProjectService } from 'modules/project/project.service'

@WebSocketGateway()
@Injectable()
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server

    constructor(
        private readonly authService: AuthService,
        private readonly projectService: ProjectService,
    ) {}

    async handleConnection(client: Socket, data: any) {
        const { id: userId } = await this.authService.verifyToken(
            client.handshake.headers.authorization.split(' ')[1],
        )
        const projectId = client.handshake.query.id

        if (!userId || !projectId) {
            client.disconnect()
        }

        const project = await this.projectService.findProjectById(
            Number(projectId),
            userId,
            false,
        )

        if (!project) {
            client.disconnect()
        }
    }

    async handleSendMessage(payload: SocketResponseTypes) {
        void this.server.emit('message', payload)
    }
}
