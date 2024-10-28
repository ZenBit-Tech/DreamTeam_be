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

  @Column({ nullable: false })
  distance: number;

  @Column({ nullable: false })
  start_address: string;

  @Column({ nullable: false })
  end_address: string;

  @ManyToOne(() => User, (user) => user.routes)
  user: User;

  @OneToMany(() => Order, (order) => order.route)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Route;
