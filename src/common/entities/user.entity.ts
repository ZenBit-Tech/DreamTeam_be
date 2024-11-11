import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  full_name: string;

  @Column({ nullable: false })
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @Column({ nullable: false })
  @ApiProperty({
    example: '+123456789',
    description: 'Phone number of the user',
  })
  phone_number: string;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  @ApiProperty({
    example: UserRole.ADMIN,
    enum: UserRole,
    description: 'Role of the user in the system',
  })
  role: UserRole;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'some_jwt_token',
    description: 'Authentication token for the user',
    required: false,
  })
  token: string;

  @ManyToOne(() => Company, (company) => company.users)
  @ApiProperty({
    description: 'Company that the user belongs to',
    type: () => Company,
  })
  company: Company;

  @OneToMany(() => Notification, (notification) => notification.user)
  @ApiProperty({
    description: 'List of notifications related to the user',
    type: () => [Notification],
  })
  notifications: Notification[];

  @OneToMany(() => Route, (route) => route.user)
  @ApiProperty({
    description: 'List of routes assigned to the user',
    type: () => [Route],
  })
  routes: Route[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Timestamp of when the user was created',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Timestamp of the last update for the user',
  })
  updated_at: Date;
}

export default User;
