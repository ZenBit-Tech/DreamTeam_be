import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import Company from 'src/common/entities/company.entity';
import { Repository } from 'typeorm';

import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let repository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const createDto: CreateCompaniesDto = {
        organization_name: 'Test Org',
        email: 'test@example.com',
        client_name: 'Test Client',
      };
      const savedCompany = {
        id: 1,
        ...createDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(savedCompany as Company);
      jest.spyOn(repository, 'save').mockResolvedValue(savedCompany as Company);

      expect(await service.create(createDto)).toEqual(savedCompany);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(createDto),
      );
    });
  });

  describe('findOne', () => {
    it('should return a single company by id', async () => {
      const company = {
        id: 1,
        organization_name: 'Test Org',
        email: 'test@example.com',
        client_name: 'Test Client',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(company as Company);

      expect(await service.findOne(1)).toEqual(company);
    });

    it('should return null if no company is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(await service.findOne(999)).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateDto: UpdateCompaniesDto = {
        organization_name: 'Updated Org',
      };
      const updatedCompany = {
        id: 1,
        ...updateDto,
        email: 'test@example.com',
        client_name: 'Test Client',
      };

      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(updatedCompany as Company);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(updatedCompany as Company);

      expect(await service.update(1, updateDto)).toEqual(updatedCompany);
      expect(repository.save).toHaveBeenCalledWith(updatedCompany);
    });
  });

  describe('remove', () => {
    it('should remove a company by id', async () => {
      const company = {
        id: 1,
        organization_name: 'Test Org',
        email: 'test@example.com',
        client_name: 'Test Client',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(company as Company);
      jest.spyOn(repository, 'remove').mockResolvedValue(company as Company);

      expect(await service.remove(1)).toEqual(company);
      expect(repository.remove).toHaveBeenCalledWith(company);
    });

    it('should return null if company to remove is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      expect(await service.remove(999)).toBeNull();
    });
  });
});
