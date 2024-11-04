import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Company from 'src/common/entities/company.entity';

import { AuthModule } from '../auth/auth.module';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), forwardRef(() => AuthModule)],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
