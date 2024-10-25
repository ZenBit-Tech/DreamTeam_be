import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderStatus } from '../enums';

import Customer from './customer.entity';
import Luggage from './luggage.entity';
import Route from './route.entity';

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  collection_date: Date;

  @Column()
  collection_address: string;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column()
  note: string;

  @Column({ nullable: true })
  failed_reason: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Route, (route) => route.orders)
  route: Route;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => Luggage, (luggage) => luggage.order)
  luggage: Luggage[];
}

export default Order;
