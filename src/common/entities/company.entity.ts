import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Customer from './customer.entity';
import User from './user.entity';

@Entity()
class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organization_name: string;

  @Column()
  email: string;

  @Column()
  client_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Customer, (customer) => customer.company)
  customers: Customer[];
}

export default Company;
