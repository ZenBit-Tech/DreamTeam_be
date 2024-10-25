import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Order from './order.entity';
import User from './user.entity';

@Entity()
class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column()
  start_address: string;

  @Column()
  end_address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.routes)
  user: User;

  @OneToMany(() => Order, (order) => order.route)
  orders: Order[];
}

export default Route;
