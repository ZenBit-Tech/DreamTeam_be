import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Customer from 'src/common/entities/customer.entity';
import Luggage from 'src/common/entities/luggage.entity';
import Order from 'src/common/entities/order.entity';
import Route from 'src/common/entities/route.entity';
import { In, Like, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    @InjectRepository(Luggage)
    private readonly luggageRepository: Repository<Luggage>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { customerId, routeId, luggageSize, luggageWeight, ...orderData } =
        createOrderDto;

      const customer = await this.customerRepository.findOneBy({
        id: customerId,
      });
      const route = await this.routeRepository.findOneBy({ id: routeId });

      if (!customer || !route) {
        throw new InternalServerErrorException('Customer or Route not found');
      }

      const luggage = this.luggageRepository.create({
        luggage_size: luggageSize,
        luggage_weight: luggageWeight,
      });

      await this.luggageRepository.save(luggage);

      const order = this.orderRepository.create({
        ...orderData,
        customer,
        route,
        luggage: [luggage],
      });

      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll(
    limit: number,
    offset: number,
  ): Promise<{ data: Order[]; total: number }> {
    try {
      const [data, total] = await this.orderRepository.findAndCount({
        relations: ['customer', 'route', 'luggage'],
        take: limit,
        skip: offset,
      });

      return { data, total };
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async findOne(id: number): Promise<Order | null> {
    try {
      return await this.orderRepository.findOne({
        where: { id },
        relations: ['customer', 'route', 'luggage'],
      });
    } catch (error) {
      console.error('Error retrieving order:', error);
      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    try {
      await this.orderRepository.update(id, updateOrderDto);

      return await this.findOne(id);
    } catch (error) {
      console.error('Error updating order:', error);
      throw new InternalServerErrorException('Failed to update order');
    }
  }
}
