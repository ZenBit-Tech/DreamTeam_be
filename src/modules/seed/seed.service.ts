import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from 'src/common/entities/user.entity';
import { UserRole } from 'src/common/enums';

import { superAdminSeedData } from './data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(): Promise<User | null> {
    try {
      const existingAdmin = await this.userRepository.findOneBy({
        role: UserRole.SUPER_ADMIN,
      });

      if (existingAdmin) {
        return null;
      }
      const superAdmin: User = this.userRepository.create(superAdminSeedData);

      return await this.userRepository.save(superAdmin);
    } catch (error) {
      throw new InternalServerErrorException('Failed to seed a super admin');
    }
  }
}
