import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import Company from 'src/common/entities/company.entity';

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

  @ApiOperation({ summary: 'Retrieve all companies' })
  @ApiOkResponse({ description: 'List of companies', type: [CompanyResponse] })
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single company by ID' })
  @ApiOkResponse({ description: 'Company details', type: CompanyResponse })
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
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompaniesDto: UpdateCompaniesDto,
  ): Promise<Company> {
    return this.companiesService.update(id, updateCompaniesDto);
  }

  @ApiOperation({ summary: 'Remove a company by ID' })
  @ApiOkResponse({ description: 'Company removed', type: CompanyResponse })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Company | null> {
    return this.companiesService.remove(id);
  }
}
