import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './infraestructure/shared/config/cors';
import { generateSwaggerDocs } from './infraestructure/http-server/utils/generate-swagger-docs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters()
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  generateSwaggerDocs(app);

  // Validate DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
