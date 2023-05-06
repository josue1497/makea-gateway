import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigClientService } from './config-client.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONFIG_PROVIDER',
        transport: Transport.TCP,
        options: {
          host: 'config-server',
          port: 4000,
        },
      },
    ]),
  ],
  providers: [ConfigClientService],
  exports: [ConfigClientService],
})
export class ConfigModule {}
