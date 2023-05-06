import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '../config/config.module';
import { ConfigClientService } from 'src/config/config-client.service';

@Module({
  imports:[
    ClientsModule.registerAsync([
      {
        name: 'USERS_PROVIDER',
        imports: [ConfigModule],
        inject: [ConfigClientService],
        useFactory: async (
          config: ConfigClientService,
        ): Promise<ClientProvider> => {
          const allConfig = await config.getConfigByService('users');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                allConfig.RABBITMQ_URL,
              ],
              queue: allConfig.RMQ_USER_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
