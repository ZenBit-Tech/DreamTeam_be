import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from '../../common/entities/order.entity';
import { CreateOrderDto } from './dto/create-orders.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        try {
            const order = this.orderRepository.create(createOrderDto);
            return await this.orderRepository.save(order);
        } catch (error) {
            console.error('Error creating order:', error);
            throw new InternalServerErrorException('Failed to create order');
        }
    }

    async findAll(): Promise<Order[]> {
        try {
            // Подключаем связи customer и route для загрузки данных клиента и маршрута
            return await this.orderRepository.find({
                relations: ['customer', 'route',"luggage"],
            });
        } catch (error) {
            console.error('Error retrieving orders:', error);
            throw new InternalServerErrorException('Failed to retrieve orders');
        }
    }

    async findOne(id: number): Promise<Order | null> {
        try {
            // Подключаем связи customer и route для загрузки данных клиента и маршрута
            return await this.orderRepository.findOne({
                where: { id },
                relations: ['customer', 'route'],
            });
        } catch (error) {
            console.error('Error retrieving order:', error);
            throw new InternalServerErrorException('Failed to retrieve order');
        }
    }

    async update(id: number, updateOrderDto: CreateOrderDto): Promise<Order> {
        try {
            await this.orderRepository.update(id, updateOrderDto);
            return this.findOne(id);
        } catch (error) {
            console.error('Error updating order:', error);
            throw new InternalServerErrorException('Failed to update order');
        }
    }
}
