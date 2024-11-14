import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

import AppModule from './app.module';
import { SeedService } from './modules/seed/seed.service';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') ?? 3000;

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    app.use(cookieParser());

    app.enableCors({
      origin: configService.get<string>('CLIENT_URL'),
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('Delivery API')
      .setDescription('Api documentation')
      .setVersion('1.0')
      .addTag('swagger')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('doc', app, document);

    const seedService = app.get(SeedService);

    await seedService.run();

    await app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
}
bootstrap().catch((error) => {
  throw new Error(error);
});
