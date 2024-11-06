import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from 'src/common/entities/user.entity';
import { UserRole } from 'src/common/enums';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  }): Promise<User | null> {
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

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.findOne({
        where: { email: createUserDto.email },
      });

      if (user) {
        throw new BadRequestException(
          `User with email:${createUserDto.email} already exists`,
        );
      }
      if (createUserDto.role !== UserRole.ADMIN) {
        throw new BadRequestException(
          `Wrong role for creating admin: ${createUserDto.role}`,
        );
      }

      return await this.userRepository.save(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to create admin user: ${(error as Error).message}`,
      );
    }
  }

  async findAndPaginateAllAdmins(
    paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    try {
      const pageOffset = 1;

      const [data, total] = await this.userRepository.findAndCount({
        where: { role: UserRole.ADMIN },
        skip: (paginationUserDto.page - pageOffset) * paginationUserDto.limit,
        take: paginationUserDto.limit,
      });

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve admins: ${(error as Error).message}`,
      );
    }
  }

  async findOneAdmin(id: number): Promise<User> {
    try {
      const user = await this.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`Admin with id:${id} not found`);
      }

      if (user.role !== UserRole.ADMIN) {
        throw new BadRequestException(`User with id:${id} is not an admin`);
      }

      return user;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve admin: ${(error as Error).message}`,
      );
    }
  }

  async updateAdmin(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Admin with id:${id} not found`);
      }

      if (user.role !== UserRole.ADMIN) {
        throw new BadRequestException(`User with id:${id} is not an admin`);
      }

      Object.assign(user, updateUserDto);

      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to update user: ${(error as Error).message}`,
      );
    }
  }

  async deleteAdmin(id: number): Promise<User> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Admin with id:${id} not found`);
      }

      if (user.role !== UserRole.ADMIN) {
        throw new BadRequestException(`User with id:${id} is not an admin`);
      }

      await this.userRepository.remove(user);

      return user;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to delete user: ${(error as Error).message}`,
      );
    }
  }
}
