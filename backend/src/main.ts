import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './infraestructure/shared/config/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters()
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation Store')
    .setDescription(
      'API Documentation Store, where you can find all the information about the endpoints',
    )
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
