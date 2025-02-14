import { Module } from '@nestjs/common';
import { HomeModule } from './routes';
import { SocketModule } from './socket/socket.module';
import { AppGateway } from './socket/app.gateway';

@Module({
  imports: [HomeModule, SocketModule],
  controllers: [],
  providers: [AppGateway]
})
export class AppModule {}
