import {
  BadRequestException,
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
  Query,
  ValidationPipe,
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
    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      UserRole.ADMIN,
    );
  }

  @Post('/dispatchers')
  @Roles(UserRole.ADMIN)
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
    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      UserRole.DISPATCHER,
    );
  }

  @Post('/drivers')
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
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
    return this.usersService.findAndPaginateAllUsersWithRole(
      paginationUserDto,
      UserRole.DRIVER,
    );
  }

  @Get('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve a single admin by ID' })
  @ApiResponse({ status: 200, description: 'Admin found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneAdmin(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOneUser(id, UserRole.ADMIN);
  }

  @Get('/dispatcher/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve a single dispatcher by ID' })
  @ApiResponse({ status: 200, description: 'Dispatcher found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneDispatcher(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.usersService.findOneUser(id, UserRole.DISPATCHER);
  }

  @Get('/driver/:id')
  @Roles(UserRole.DISPATCHER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve a single driver by ID' })
  @ApiResponse({ status: 200, description: 'Driver found', type: User })
  @HttpCode(HttpStatus.OK)
  findOneDriver(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOneUser(id, UserRole.DRIVER);
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
    return this.usersService.createUserWithRole(createUserDto, [
      UserRole.ADMIN,
    ]);
  }

  @Post('/admin/dispatcher-driver')
  @Roles(UserRole.ADMIN)
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
    return this.usersService.createUserWithRole(createUserDto, [
      UserRole.DISPATCHER,
      UserRole.DRIVER,
    ]);
  }

  @Patch('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
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
    return this.usersService.updateUserById(id, updateUserDto, UserRole.ADMIN);
  }

  @Patch('/dispatcher/:id')
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
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
    return this.usersService.updateUserById(
      id,
      updateUserDto,
      UserRole.DISPATCHER,
    );
  }

  @Patch('/driver/:id')
  @Roles(UserRole.ADMIN, UserRole.DRIVER)
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
    return this.usersService.updateUserById(id, updateUserDto, UserRole.DRIVER);
  }

  @Delete('/admin/:id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully deleted',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser(id, [UserRole.ADMIN]);
  }

  @Delete('/admin/dispatcher-driver/:id')
  @Roles(UserRole.ADMIN)
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
    return this.usersService.deleteUser(id, [
      UserRole.DISPATCHER,
      UserRole.DRIVER,
    ]);
  }

  @Get('/admins/company/:companyId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve admins by company ID' })
  @ApiResponse({
    status: 200,
    description: 'List of admins by company ID',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  findAdminsByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<User[]> {
    return this.usersService.findUsersByCompanyId(companyId, UserRole.ADMIN);
  }

  @Get('/admins')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Retrieve paginated admins list' })
  @ApiResponse({ status: 200, description: 'List of admins', type: [User] })
  @HttpCode(HttpStatus.OK)
  async getAdminsList(
    @Query() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    return this.usersService.findAndPaginateAllUsersWithRole(paginationUserDto);
  }

  @Get('/admins/search-by-company')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Search admins by company and name with pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of admins in the company matching the name',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  async searchAdminsByCompanyAndName(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('name') name: string,
    @Query() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    if (!companyId) {
      throw new BadRequestException('CompanyId query parameter is required');
    }
    if (!name) {
      throw new BadRequestException('Name query parameter is required');
    }

    return this.usersService.findAndPaginateAdminsByCompanyAndName(
      companyId,
      name,
      paginationUserDto,
    );
  }

  @Post('/admins/company/:companyId')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create or update admin by company ID' })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully added or updated for the company',
    type: CreateUserDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async addOrUpdateAdmin(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.usersService.addAdminToCompany(companyId, createUserDto);
  }

  @Patch('/admins/edit')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Edit a specific admin for a company by email',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully updated for the company',
    type: UpdateUserDto,
  })
  @HttpCode(HttpStatus.OK)
  async editAdminForCompany(
    @Query('company') companyId: number,
    @Query('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.editAdminToCompany(
      companyId,
      email,
      updateUserDto,
    );
  }
}
