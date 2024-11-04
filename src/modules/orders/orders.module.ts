import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import Order from '../../common/entities/order.entity';
import {OrderController} from "./orders.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrdersService],
})
export class OrdersModule {}
