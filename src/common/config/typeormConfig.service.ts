import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      sql: {
        type,
        logging,
        host,
        port,
        username,
        password,
        database,
        synchronize,
      },
    } = this.configService.get('database');

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize,
      logging,
    };
  }
}

export default TypeOrmConfigService;
