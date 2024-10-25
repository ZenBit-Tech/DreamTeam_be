import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Luggage from './luggage.entity';

@Entity()
class LuggageImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Luggage, (luggage) => luggage.images)
  luggage: Luggage;
}

export default LuggageImage;
