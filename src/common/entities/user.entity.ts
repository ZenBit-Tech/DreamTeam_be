import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { UserRole } from '../enums';

import Company from './company.entity';
import Notification from './notification.entity';
import Route from './route.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column()
  token: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Route, (route) => route.user)
  routes: Route[];
}

export default User;
