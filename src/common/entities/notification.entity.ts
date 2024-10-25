import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NotificationType } from '../enums';

import User from './user.entity';

@Entity()
class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column()
  is_read: boolean;

  @Column({ nullable: true })
  link: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}

export default Notification;
