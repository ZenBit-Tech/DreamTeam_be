import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './app.module';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') ?? 3000;

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    const config = new DocumentBuilder()
      .setTitle('Delivery API')
      .setDescription('Api documentation')
      .setVersion('1.0')
      .addTag('swagger')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('doc', app, document);

    await app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
}
bootstrap().catch((error) => {
  throw new Error(error);
});
