import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { TransactionApplication } from '../src/core/application/TransactionApplication';
import request from 'supertest';
import { CreateTransactionRequest } from '../src/infraestructure/http-server/model/create-transaction.request';
import { TRANSACTION_APPLICATION } from '../src/core/core.module';
import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';

function TransactionApplicationMock(fn: any) {
  return {
    createTransaction: fn,
    updateStatus: fn,
    getTransaction: fn,
  } as TransactionApplication;
}

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  const prepareteApp = async (mock: any) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TRANSACTION_APPLICATION)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  };

  it('/transaction (POST) with Transaction created OK', async () => {
    const mock = TransactionApplicationMock(jest.fn().mockResolvedValue(1));

    await prepareteApp(mock);

    const body: CreateTransactionRequest = {
      amount: 835526,
      productId: 3,
      customer: {
        name: 'John Doe',
        email: 'test@gmail.com',
        phone: '3000000000',
        address: 'Calle 123',
      },
      card: {
        number: '4242424242424242',
        exp_month: '08',
        exp_year: '28',
        cvc: '123',
        card_holder: 'José Pérez',
        installments: 1,
      },
      date: new Date(),
      numberUnits: 1,
    };
    return request(app.getHttpServer())
      .post('/transaction')
      .send(body)
      .expect(HttpStatus.CREATED)
      .expect({
        status: HttpStatus.CREATED,
        message: 'Transaction created OK',
        data: { IdTransaction: 1 },
      });
  });

  it('/transaction (POST) throws 400 invalid transaction', async () => {
    const errorMessage = 'Invalid transaction';

    const mock = TransactionApplicationMock(
      jest
        .fn()
        .mockRejectedValue(
          new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
        ),
    );

    const expected = {
      status: HttpStatus.BAD_REQUEST,
      message: errorMessage,
    };

    await prepareteApp(mock);

    const body: CreateTransactionRequest = {
      amount: 835526,
      productId: 3,
      customer: {
        name: 'John Doe',
        email: 'test@gmail.com',
        phone: '3000000000',
        address: 'Calle 123',
      },
      card: {
        number: '4242424242424242',
        exp_month: '08',
        exp_year: '28',
        cvc: '123',
        card_holder: 'José Pérez',
        installments: 1,
      },
      date: new Date(),
      numberUnits: 1,
    };

    return request(app.getHttpServer())
      .post('/transaction')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expected);
  });

  it('/transaction (GET) with Transaction get OK', async () => {
    const mock = TransactionApplicationMock(jest.fn().mockResolvedValue(1));
    await prepareteApp(mock);
    return request(app.getHttpServer())
      .get('/transaction/1')
      .expect(HttpStatus.OK)
      .expect({
        status: HttpStatus.OK,
        message: 'Transaction(id=1) get OK',
        data: 1,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
