import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ProductApplication } from '../src/core/application/ProductApplication';
import { AppModule } from '../src/app.module';
import { PRODUCT_APPLICATION } from '../src/core/core.module';

function ProductCreatorMock(fn: any) {
  return {
    createProduct: fn,
    updateStockProduct: fn,
    findAll: fn,
    findById: fn,
    findByIds: fn,
  } as ProductApplication;
}

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  it('/product (GET) with Products found', async () => {
    const mock = ProductCreatorMock(jest.fn().mockResolvedValue([]));
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PRODUCT_APPLICATION)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    return request(app.getHttpServer()).get('/product').expect(200).expect({
      status: 200,
      message: 'Products found',
      data: [],
    });
  });

  it('/product (POST) with Product created OK', async () => {
    const mock = ProductCreatorMock(jest.fn().mockResolvedValue(1));
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PRODUCT_APPLICATION)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const body = {
      productName: 'Bike',
      productDescription:
        'Este es un excelente Luxurious Frozen Bike que cumple con todas tus expectativas.',
      unitPrice: 100000,
      unitsInStock: 100,
      imageUrl:
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzkzODR8MHwxfHNlYXJjaHwxfHxMdXh1cmlvdXMlMjBGcm96ZW4lMjBCaWtlfGVufDB8fHx8MTcyMjU2MjE0M3ww&ixlib=rb-4.0.3&q=85',
    };

    return request(app.getHttpServer())
      .post('/product')
      .send(body)
      .expect(201)
      .expect({
        status: 201,
        message: 'Product(id=1) created OK',
      });
  });
});
