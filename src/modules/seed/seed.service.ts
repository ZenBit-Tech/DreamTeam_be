import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from 'src/common/entities/user.entity';
import {OrderStatus, UserRole} from 'src/common/enums';
import { Repository } from 'typeorm';

import {getOrdersSeedData, superAdminSeedData} from './data';
import Order from 'src/common/entities/order.entity';
import Customer from 'src/common/entities/customer.entity';
import Route from 'src/common/entities/route.entity';
import Luggage from "src/common/entities/luggage.entity";

@Injectable()
export class SeedService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
      @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
      @InjectRepository(Route) private readonly routeRepository: Repository<Route>,
      @InjectRepository(Luggage) private readonly luggageRepository: Repository<Luggage>,
  ) {}

  async seedSuperAdmin(): Promise<User | null> {
    try {
      const existingAdmin = await this.userRepository.findOneBy({
        role: UserRole.SUPER_ADMIN,
      });

      if (existingAdmin) {
        return null;
      }
      const superAdmin: User = this.userRepository.create(superAdminSeedData);

      return await this.userRepository.save(superAdmin);
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed a super admin');
    }
  }

  async seedOrders(): Promise<void> {
    try {
      const customer = await this.customerRepository.findOne({ where: { id: 1 } });
      const route = await this.routeRepository.findOne({ where: { id: 1 } });

      if (!customer || !route) {
        throw new Error('Customer or Route not found. Ensure they exist before seeding orders.');
      }

      const ordersData = getOrdersSeedData(customer, route);

      for (const orderData of ordersData) {
        const { luggage: luggageData, ...orderDetails } = orderData;

        const order = this.orderRepository.create({
          ...orderDetails,
          status: OrderStatus.UPCOMING,
        });

        const savedOrder = await this.orderRepository.save(order);

        for (const luggageInfo of luggageData) {
          const luggage = this.luggageRepository.create({
            ...luggageInfo,
            order: savedOrder,
          });
          await this.luggageRepository.save(luggage);
        }
      }

      console.log('Successfully seeded orders and luggage.');
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed orders and luggage');
    }
  }

  async run(): Promise<void> {
    await this.seedSuperAdmin();
    await this.seedOrders();
  }
}
