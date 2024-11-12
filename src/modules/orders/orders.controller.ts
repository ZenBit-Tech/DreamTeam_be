import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    ParseIntPipe,
    Query,
    DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import Order from 'src/common/entities/order.entity';
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

    @ApiOperation({ summary: 'Retrieve all orders with pagination' })
    @ApiOkResponse({
        description: 'List of paginated orders',
        type: [OrderResponse],
    })

    @Get()
    async findAll(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    ): Promise<{ data: Order[]; total: number }> {
        return this.ordersService.findAll(limit, offset);
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
