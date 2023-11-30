import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { OrderService } from '../shcemas/order.service';
import { CreateTaxiDTO } from '../dto/taxi.dto';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}
    @Post()
    create(@Body() orderDto: CreateTaxiDTO[]) {
        return this.orderService.create(orderDto)
    }

    @Get()
    getAnswer(){
        return 'working mazafaka'
    }

}
