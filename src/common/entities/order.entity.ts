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

  @Column({ nullable: false })
  collection_date: Date;

  @Column({ nullable: false })
  collection_address: string;

  @Column({ type: 'enum', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  failed_reason: string;

  @ManyToOne(() => Route, (route) => route.orders)
  route: Route;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => Luggage, (luggage) => luggage.order)
  luggage: Luggage[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Order;
