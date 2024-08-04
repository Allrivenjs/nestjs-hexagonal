import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateSwaggerDocs(app: INestApplication) {
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
}
