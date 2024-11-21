import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from 'src/common/entities/user.entity';
import { UserRole } from 'src/common/enums';
import { Like, Repository } from 'typeorm';

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

  async createUserWithRole(
    createUserDto: CreateUserDto,
    allowedRoles: UserRole[],
  ): Promise<User> {
    try {
      const user = await this.findOne({
        where: { email: createUserDto.email },
      });

      if (user) {
        throw new BadRequestException(
          `User with email:${createUserDto.email} already exists`,
        );
      }
      if (!allowedRoles.includes(createUserDto.role)) {
        throw new BadRequestException(
          `Invalid role for creating user: ${createUserDto.role}`,
        );
      }

      return await this.userRepository.save(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to create user: ${(error as Error).message}`,
      );
    }
  }

  async findAndPaginateAllUsersWithRole(
    paginationUserDto: PaginationUserDto,
    role?: UserRole,
  ): Promise<{ data: User[]; total: number }> {
    try {
      const pageOffset = 1;

      const whereCondition = role ? { role } : {};

      const [data, total] = await this.userRepository.findAndCount({
        where: whereCondition,
        skip: (paginationUserDto.page - pageOffset) * paginationUserDto.limit,
        take: paginationUserDto.limit,
      });

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve users: ${(error as Error).message}`,
      );
    }
  }

  async findOneUser(id: number, role: UserRole): Promise<User> {
    try {
      const user = await this.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }

      if (user.role !== role) {
        throw new BadRequestException(`User with id: ${id} is not a ${role}`);
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
        `Failed to retrieve user: ${(error as Error).message}`,
      );
    }
  }

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
    role: UserRole,
  ): Promise<User | null> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with id:${id} not found`);
      }

      if (user.role !== role) {
        throw new BadRequestException(`User with id: ${id} is not a ${role}`);
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

  async deleteUser(id: number, allowedRoles: UserRole[]): Promise<User> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with id:${id} not found`);
      }

      if (!allowedRoles.includes(user.role)) {
        throw new BadRequestException(
          `You can't delete user with role: ${user.role}`,
        );
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

  async findUsersByCompanyId(
    companyId: number,
    role: UserRole,
  ): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        company: { id: companyId },
        role,
      },
      relations: ['company'],
    });

    return users;
  }

  async findAndPaginateAdminsByCompanyAndName(
    companyId: number,
    name: string,
    paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    try {
      const pageOffset = 1;

      const [data, total] = await this.userRepository.findAndCount({
        where: {
          role: UserRole.ADMIN,
          company: {
            id: companyId,
          },
          full_name: Like(`%${name}%`),
        },
        relations: ['company'],
        skip: (paginationUserDto.page - pageOffset) * paginationUserDto.limit,
        take: paginationUserDto.limit,
      });

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find paginated admins by company and name: ${(error as Error).message}`,
      );
    }
  }

  async addAdminToCompany(
    companyId: number,
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email, company: { id: companyId } },
    });

    if (existingUser) {
      throw new BadRequestException(
        `User with email ${createUserDto.email} already exists in this company.`,
      );
    }

    if (createUserDto.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        `Invalid role ${createUserDto.role}. Only ADMIN role is allowed.`,
      );
    }

    const newAdmin = this.userRepository.create({
      ...createUserDto,
      company: { id: companyId },
    });

    return this.userRepository.save(newAdmin);
  }

  async editAdminInCompany(
    companyId: number,
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const admin = await this.userRepository.findOne({
      where: {
        email,
        company: { id: companyId },
        role: UserRole.ADMIN,
      },
    });

    if (!admin) {
      throw new NotFoundException(
        `Admin with email ${email} in company ${companyId} not found.`,
      );
    }

    await this.userRepository.update(admin.id, updateUserDto);

    return this.userRepository.findOne({
      where: { id: admin.id },
    });
  }
}
