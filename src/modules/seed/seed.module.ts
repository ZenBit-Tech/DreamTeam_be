import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from 'src/common/entities/user.entity';

import { SeedService } from './seed.service';
import Customer from "src/common/entities/customer.entity";
import Order from "src/common/entities/order.entity";
import Route from "src/common/entities/route.entity";
import Luggage from "src/common/entities/luggage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer,Order,Route, Luggage])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
