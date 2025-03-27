import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const title = process.env.SWAGGER_TITLE || 'Converson API';
  const description =
    process.env.SWAGGER_DESCRIPTION || 'API for converting documents';
  const version = process.env.SWAGGER_VERSION || 'undefined';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Server is running on port ${port}`);
  console.log('Documentation is available at /swagger');
}
bootstrap();
