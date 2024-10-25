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

  @Column({ type: 'enum', enum: LuggageSize })
  luggage_size: LuggageSize;

  @Column()
  luggage_weight: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.luggage)
  order: Order;

  @OneToMany(() => LuggageImage, (luggageImage) => luggageImage.luggage)
  images: LuggageImage[];
}

export default Luggage;
