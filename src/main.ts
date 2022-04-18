import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AuthSocketIoAdapter } from 'modules/events/auth.adapter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useWebSocketAdapter(new AuthSocketIoAdapter(app))
    await app.listen(3000)
}
bootstrap()
