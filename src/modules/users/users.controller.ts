import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import User from 'src/common/entities/user.entity';
import { UserRole } from 'src/common/enums';
import { Roles } from 'src/common/guards/roles-auth.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/admins')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve all admins' })
  @ApiResponse({ status: 200, description: 'List of all admins', type: [User] })
  @HttpCode(HttpStatus.OK)
  findAllAdmins(
    @Body() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    const allowedRole: UserRole = UserRole.ADMIN;

    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      allowedRole,
    );
  }

  @Post('/dispatchers')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve all dispatchers' })
  @ApiResponse({
    status: 200,
    description: 'List of all dispatchers',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  findAllDispatchers(
    @Body() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    const allowedRole: UserRole = UserRole.DISPATCHER;

    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      allowedRole,
    );
  }

  @Post('/drivers')
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve all drivers' })
  @ApiResponse({
    status: 200,
    description: 'List of all drivers',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  findAllDrivers(
    @Body() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    const allowedRole: UserRole = UserRole.DRIVER;

    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      allowedRole,
    );
  }

  @Get('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve a single admin by ID' })
  @ApiResponse({ status: 200, description: 'Admin found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneAdmin(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    const allowedRole: UserRole = UserRole.ADMIN;

    return this.usersService.findOneUser(id, allowedRole);
  }

  @Get('/dispatcher/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve a single dispatcher by ID' })
  @ApiResponse({ status: 200, description: 'Dispatcher found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneDispatcher(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    const allowedRole: UserRole = UserRole.DISPATCHER;

    return this.usersService.findOneUser(id, allowedRole);
  }

  @Get('/driver/:id')
  @Roles(UserRole.DISPATCHER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve a single driver by ID' })
  @ApiResponse({ status: 200, description: 'Driver found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneDriver(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    const allowedRole: UserRole = UserRole.DRIVER;

    return this.usersService.findOneUser(id, allowedRole);
  }

  @Post('/admin')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  createAdmin(@Body() createUserDto: CreateUserDto): Promise<User> {
    const allowedRoles: UserRole[] = [UserRole.ADMIN];

    return this.usersService.createUserWithRole(createUserDto, allowedRoles);
  }

  @Post('/admin/dispatcher-driver')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new dispatcher or driver' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  createDispatcherOrDriver(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const allowedRoles: UserRole[] = [UserRole.DISPATCHER, UserRole.DRIVER];

    return this.usersService.createUserWithRole(createUserDto, allowedRoles);
  }

  @Patch('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully updated',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const allowedRole: UserRole = UserRole.ADMIN;

    return this.usersService.updateUserById(id, updateUserDto, allowedRole);
  }

  @Patch('/dispatcher/:id')
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a dispatcher' })
  @ApiResponse({
    status: 200,
    description: 'Dispatcher successfully updated',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  updateDispatcher(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const allowedRole: UserRole = UserRole.DISPATCHER;

    return this.usersService.updateUserById(id, updateUserDto, allowedRole);
  }

  @Patch('/driver/:id')
  @Roles(UserRole.ADMIN, UserRole.DRIVER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a dispatcher' })
  @ApiResponse({
    status: 200,
    description: 'Dispatcher successfully updated',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  updateDriver(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const allowedRole: UserRole = UserRole.DRIVER;

    return this.usersService.updateUserById(id, updateUserDto, allowedRole);
  }

  @Delete('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully deleted',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const allowedRoles: UserRole[] = [UserRole.ADMIN];

    return this.usersService.deleteUser(id, allowedRoles);
  }

  @Delete('/admin/dispatcher-driver/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a dispatcher or driver' })
  @ApiResponse({
    status: 200,
    description: 'Dispatcher or driver successfully deleted',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  deleteDispatcherOrDriver(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    const allowedRoles: UserRole[] = [UserRole.DISPATCHER, UserRole.DRIVER];

    return this.usersService.deleteUser(id, allowedRoles);
  }
}
