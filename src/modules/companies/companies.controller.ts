import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import Company from 'src/common/entities/company.entity';
import { UserRole } from 'src/common/enums';
import { Roles } from 'src/common/guards/roles-auth.decorator';

import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';
import CompanyResponse from './types';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'Create a new company' })
  @ApiCreatedResponse({
    description: 'Company has been created successfully',
    type: CompanyResponse,
  })
  @Post()
  async create(
    @Body() createCompaniesDto: CreateCompaniesDto,
  ): Promise<Company> {
    return this.companiesService.create(createCompaniesDto);
  }

  @ApiOperation({
    summary:
      'Retrieve all companies. If query parameter "organization-name" is used, then search by organization name is applied. If no such company found [] is returned ',
  })
  @ApiOkResponse({ description: 'List of companies', type: [CompanyResponse] })
  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  async findAll(
    @Query('organization-name') organizationName: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<{ data: Company[]; total: number }> {
    return this.companiesService.findByOrganizationName(
      organizationName,
      page,
      limit,
    );
  }

  @ApiOperation({ summary: 'Retrieve a single company by ID' })
  @ApiOkResponse({ description: 'Company details', type: CompanyResponse })
  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Company | null> {
    return this.companiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update company by ID' })
  @ApiOkResponse({
    description: 'Updated company details',
    type: CompanyResponse,
  })
  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompaniesDto: UpdateCompaniesDto,
  ): Promise<Company> {
    return this.companiesService.update(id, updateCompaniesDto);
  }

  @ApiOperation({ summary: 'Remove a company by ID' })
  @ApiOkResponse({ description: 'Company removed', type: CompanyResponse })
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Company | null> {
    return this.companiesService.remove(id);
  }
}
