import { Body, Controller, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { TaxiDTO } from 'src/dto/taxi.dto';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Post()
    create(@Body() orderDto: { list: TaxiDTO[], isFrench: boolean }) {
        return this.orderService.create(orderDto)
    }

    @Get()
    getOrders(){
        return this.orderService.getOrders();
    }

    @Get(':id')
    getOrder(@Param('id') id: string,){
        return this.orderService.getOrder(id);
    }

    @Patch('status')
    updateStatus(@Param('id') id: string, @Body('status') status){
        return this.orderService.updateStatus(id, status)
    }

    @Patch(':id')
    updateOrder(@Param('id') id: string, @Body() orderDto: TaxiDTO){
        return this.orderService.updateOrder(id, orderDto)
    }

}
