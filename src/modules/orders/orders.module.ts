import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import Order from 'src/common/entities/order.entity';
import {OrderController} from "./orders.controller";
import Customer from "src/common/entities/customer.entity";
import Route from "src/common/entities/route.entity";
import Luggage from "src/common/entities/luggage.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order,Customer, Route, Luggage])],
    controllers: [OrderController],
    providers: [OrdersService],
})
export class OrdersModule {}
