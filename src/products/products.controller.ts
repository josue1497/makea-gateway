import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {

    }

    @Get()
    findAll() {
        return this.productsService.findAllProducts()
    }

    @Get(':id')
    findOne(@Param() id: string) {
        return this.productsService.findProductById(id)
    }

    @Post()
    create(@Body() product: any) {
        return this.productsService.createProduct(product)
    }

    @Put(':id')
    update(@Param() id: string, @Body() product: any) {
        return this.productsService.updateProduct(id, product)
    }
}
