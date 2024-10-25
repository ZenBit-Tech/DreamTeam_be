import { ConfigService, registerAs } from '@nestjs/config';

const sqlConfig = registerAs('database', () => {
  const configService = new ConfigService();

  return {
    type: configService.get<string>('SQL_DIALECT') || 'mysql',
    logging: configService.get<string>('SQL_LOGGING') === 'true',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: configService.get<string>('PRODUCTION') === 'false',
  };
});

export default sqlConfig;
