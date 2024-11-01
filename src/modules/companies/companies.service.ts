import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Company from 'src/common/entities/company.entity';
import { Like, Repository } from 'typeorm';

import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompaniesDto: CreateCompaniesDto): Promise<Company> {
    try {
      const company = this.companyRepository.create(createCompaniesDto);

      return await this.companyRepository.save(company);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.companyRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve companies');
    }
  }

  async findByOrganizationName(organizationName: string): Promise<Company[]> {
    try {
      if (!organizationName) return await this.companyRepository.find();

      return await this.companyRepository.find({
        where: {
          organization_name: Like(`%${organizationName}%`),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve companies');
    }
  }

  async findOne(id: number): Promise<Company | null> {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      if (!company) return null;

      return company;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve company');
    }
  }

  async update(
    id: number,
    updateCompaniesDto: UpdateCompaniesDto,
  ): Promise<Company> {
    try {
      const company = await this.findOne(id);

      if (!company)
        throw new NotFoundException(`Company with ID ${id} not found`);

      Object.assign(company, updateCompaniesDto);

      return await this.companyRepository.save(company);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  async remove(id: number): Promise<Company | null> {
    try {
      const company = await this.findOne(id);

      if (!company) return null;
      await this.companyRepository.remove(company);

      return company;
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove company');
    }
  }
}
