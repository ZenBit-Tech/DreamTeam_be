import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './common/config/configuration';
import TypeOrmConfigService from './common/config/typeormConfig.service';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    CompaniesModule,
  ],
})
export default class AppModule {}
