import { Test, TestingModule } from '@nestjs/testing';

import Company from 'src/common/entities/company.entity';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;
  const mockCompany: Company = {
    id: 1,
    organization_name: 'Company A',
    email: 'test@company.com',
    client_name: 'Client A',
    created_at: new Date(),
    updated_at: new Date(),
    users: [],
    customers: [],
  };

  const mockService = {
    create: jest.fn((dto: CreateCompaniesDto) => {
      return { id: Date.now(), ...dto };
    }),
    findAll: jest.fn(() => {
      return [mockCompany];
    }),
    findOne: jest.fn(() => {
      return mockCompany;
    }),
    update: jest.fn((id: number, dto: UpdateCompaniesDto) => {
      return { id, ...dto };
    }),
    remove: jest.fn(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const dto: CreateCompaniesDto = {
        organization_name: 'Company B',
        email: 'test@companyb.com',
        client_name: 'Client B',
      };

      expect(await controller.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      expect(await controller.findAll()).toEqual([mockCompany]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single company by id', async () => {
      expect(await controller.findOne('1')).toEqual(mockCompany);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a company by id', async () => {
      const dto: UpdateCompaniesDto = {
        organization_name: 'Updated Company',
        email: 'updated@company.com',
        client_name: 'Updated Client',
      };

      expect(await controller.update('1', dto)).toEqual({ id: 1, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a company by id', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
