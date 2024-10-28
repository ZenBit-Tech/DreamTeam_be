import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LuggageSize } from '../enums';

import LuggageImage from './luggageImage.entity';
import Order from './order.entity';

@Entity()
class Luggage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: LuggageSize, nullable: false })
  luggage_size: LuggageSize;

  @Column({ nullable: false })
  luggage_weight: number;

  @ManyToOne(() => Order, (order) => order.luggage)
  order: Order;

  @OneToMany(() => LuggageImage, (luggageImage) => luggageImage.luggage)
  images: LuggageImage[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Luggage;
