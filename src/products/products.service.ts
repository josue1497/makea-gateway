import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

    private readonly logger = new Logger();
    constructor(@Inject('PRODUCTS_PROVIDER') private client: ClientProxy) { }

    async findAllProducts() {
        const msgPattern = { cmd: 'findAllProducts' };
        try {
            const source = this.client
                .send(msgPattern, {})
                .pipe();

            return await lastValueFrom(source);
        } catch (error) {
            console.error(error)
            this.logger.error(
                {
                    message: `An error occurs, while querying products`,
                },
                JSON.stringify(error),
            );

            throw new InternalServerErrorException();
        }
    }

    async findProductById(id: string) {
        const msgPattern = { cmd: 'findProductById' };
        try {
            const source = this.client
                .send(msgPattern, id)
                .pipe();

            return await lastValueFrom(source);
        } catch (error) {
            this.logger.error(
                {
                    message: `An error occurs, while querying products`,
                },
                JSON.stringify(error),
            );

            if(error.message === 'Product not found'){
                throw new NotFoundException(error);
            }

            throw new InternalServerErrorException(error);
        }
    }

    async createProduct(data: any) {
        const msgPattern = { cmd: 'createProduct' };
        try {
            const source = this.client
                .send(msgPattern, data)
                .pipe();

            return await lastValueFrom(source);
        } catch (error) {
            console.error(error)
            this.logger.error(
                {
                    message: `An error occurs, while querying products`,
                    ctx: data,
                },
                JSON.stringify(error),
            );

            if(error.message === 'Product already exists'){
                throw new ConflictException(error);
            }

            throw new InternalServerErrorException();
        }
    }

    async updateProduct(id: string, data: any) {
        const msgPattern = { cmd: 'updateProduct' };
        try {
            const source = this.client
                .send(msgPattern, { id, data })
                .pipe();

            return await lastValueFrom(source);
        } catch (error) {
            console.error(error)
            this.logger.error(
                {
                    message: `An error occurs, while querying products`,
                    ctx: data,
                },
                JSON.stringify(error),
            );

            if(error.message === 'Product not found'){
                throw new NotFoundException(error);
            }

            throw new InternalServerErrorException();
        }
    }

    // delete method
    async deleteProduct(id: string) {
        const msgPattern = { cmd: 'deleteProduct' };
        try {
            const source = this.client
                .send(msgPattern, id)
                .pipe();

            return await lastValueFrom(source);
        } catch (error) {
            console.error(error)
            this.logger.error(
                {
                    message: `An error occurs, while querying products`,
                    ctx: id,
                },
                JSON.stringify(error),
            );

            if(error.message === 'Product not found'){
                throw new NotFoundException(error);
            }

            throw new InternalServerErrorException();
        }
    }

}
