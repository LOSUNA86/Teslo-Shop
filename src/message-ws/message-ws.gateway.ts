import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
      private readonly messageWsService: MessageWsService,
      private readonly jwtService: JwtService) {}
  
  async handleConnection(client: Socket ) {
   
    const token = client.handshake.headers.authentication as string;
    
    let payload: JwtPayload;

    try {
      client.join('MiSala');
      payload = this.jwtService.verify( token );
      await this.messageWsService.registerClient( client, payload.id );

    } catch (error) {
      client.disconnect();
      return;
    }
   
    this.wss.to('MiSala').emit('clients-updated', this.messageWsService.getConnectedClients() );    
    //console.log({ conectados: this.messageWsService.getConnectedClients() });
  }

  handleDisconnect(client: Socket) {
    this.messageWsService.removeClient( client.id );    
    this.wss.to('MiSala').emit('clients-updated', this.messageWsService.getConnectedClients() );
    //console.log({ conectados: this.messageWsService.getConnectedClients() });
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient( client: Socket, payload: NewMessageDto ) {
    
    // Emite únicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: client.id,
    //   message: payload.message || 'no-message!!'
    // });

     // Emitir a todos MENOS, al cliente inicial
    client.broadcast.to('MiSala').emit('message-from-server', {
      fullName: this.messageWsService.getUserFullName(client.id),
      message: payload.message || 'no-message!!'
    });

    // this.wss.to('MiSala').emit('message-from-server', {
    //   fullName: this.messageWsService.getUserFullName(client.id),
    //   message: payload.message || 'no-message!!'
    // });

  }
    
}
