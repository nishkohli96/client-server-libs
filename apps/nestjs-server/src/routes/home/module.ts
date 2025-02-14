import { Module } from '@nestjs/common';
import { HomeController } from './controller';
import { HomeService } from './service';
import { AppGateway } from '../../socket/app.gateway';

@Module({
  controllers: [HomeController],
  providers: [HomeService, AppGateway]
})
export class HomeModule {}
