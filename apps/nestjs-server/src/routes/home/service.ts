import { Injectable } from '@nestjs/common';
import { AppGateway } from '../../socket/app.gateway';

@Injectable()
export class HomeService {
  constructor(private readonly appGateway: AppGateway) {}

  getHello(): string {
    const message = 'Hello World!';
    this.appGateway.server.emit('message', message);
    return message;
  }
}
