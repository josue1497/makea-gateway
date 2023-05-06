import { Module } from '@nestjs/common';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '../config/config.module';
import { ConfigClientService } from '../config/config-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTS_PROVIDER',
        imports: [ConfigModule],
        inject: [ConfigClientService],
        useFactory: async (
          config: ConfigClientService,
        ): Promise<ClientProvider> => {
          const allConfig = await config.getConfigByService('products');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                allConfig.RABBITMQ_URL,
              ],
              queue: allConfig.RMQ_PRODUCT_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
