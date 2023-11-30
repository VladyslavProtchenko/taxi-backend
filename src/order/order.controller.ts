import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from '../dto/order.dto';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}
    @Post()
    create(@Body() orderDto: CreateOrderDTO) {
        return this.orderService.create(orderDto)
    }

}
