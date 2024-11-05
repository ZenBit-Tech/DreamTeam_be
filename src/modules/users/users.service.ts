import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from 'src/common/entities/user.entity';
import { UserRole } from 'src/common/enums';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(filter: {
    where: {
      id?: number;
      full_name?: string;
      email?: string;
      phone_number?: string;
      role?: UserRole;
      token?: string;
      companyId?: string;
    };
  }): Promise<User> {
    return this.userRepository.findOne({ ...filter });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    try {
      await this.userRepository.update(id, data);

      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
}
