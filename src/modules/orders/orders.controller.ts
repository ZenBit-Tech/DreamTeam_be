import { Body, Controller, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import Order from '../../common/entities/order.entity';
import OrderResponse from "./types";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Create a new order' })
    @ApiCreatedResponse({
        description: 'Order has been created successfully',
        type: OrderResponse,
    })
    @Post()
    async create(
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    @ApiOperation({ summary: 'Retrieve all orders' })
    @ApiOkResponse({
        description: 'List of orders',
        type: [OrderResponse],
    })
    @Get()
    async findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @ApiOperation({ summary: 'Retrieve a single order by ID' })
    @ApiOkResponse({
        description: 'Order details',
        type: OrderResponse,
    })
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Order | null> {
        return this.ordersService.findOne(id);
    }

    @ApiOperation({ summary: 'Update order by ID' })
    @ApiOkResponse({
        description: 'Updated order details',
        type: OrderResponse,
    })
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDto: CreateOrderDto,
    ): Promise<Order> {
        return this.ordersService.update(id, updateOrderDto);
    }
}
