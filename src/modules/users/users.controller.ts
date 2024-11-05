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

import { CreateUserDto } from './dto/create-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/admins')
  @ApiOperation({ summary: 'Retrieve all admins' })
  @ApiResponse({ status: 200, description: 'List of all admins', type: [User] })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Body() paginationUserDto: PaginationUserDto,
  ): Promise<{ data: User[]; total: number }> {
    return this.usersService.findAndPaginateAllAdmins(paginationUserDto);
  }

  @Get('/admin/:id')
  @ApiOperation({ summary: 'Retrieve a single admin by ID' })
  @ApiResponse({ status: 200, description: 'Admin found', type: User })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOneAdmin(id);
  }

  @Post('/admin')
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createAdminUser(createUserDto);
  }

  @Patch('/admin/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersService.updateAdmin(id, updateUserDto);
  }

  @Delete('/admin/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteAdmin(id);
  }
}
