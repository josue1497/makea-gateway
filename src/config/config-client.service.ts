import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConfigClientService {

    constructor(
        @Inject('CONFIG_PROVIDER')
        private readonly client: ClientProxy,
    ) { }

    async getConfigByService(service: string): Promise<any> {
        try {
            const pattern = { cmd: 'getCofigByService' };
            const source = this.client.send<any>(pattern, service).pipe()
            return await lastValueFrom(source);
        } catch (err) {
            console.error(err);

            throw err;
        }
    }
}
