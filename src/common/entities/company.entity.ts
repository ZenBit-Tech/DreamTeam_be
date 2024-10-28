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

  @Column({ nullable: false })
  organization_name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  client_name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Customer, (customer) => customer.company)
  customers: Customer[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Company;
