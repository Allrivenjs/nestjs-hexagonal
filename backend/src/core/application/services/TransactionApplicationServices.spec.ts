import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { Product } from '../../domain/entities/Product';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { TransactionApplication } from '../TransactionApplication';
import { TransactionApplicationService } from './TransactionApplicationServices';
import { CreateTransactionDto } from '../../shared/dto/create-transaction.dto';
import { StatusType } from '../../shared/types/status.type';
import { Transaction } from '../../domain/entities/Transaction';
import { CustomerService } from '../../domain/ports/inbound/CustomerService';
import { Customer } from '../../domain/entities/Customer';
import { CardDto } from '../../../infraestructure/payment/wompi/dto/card.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CardRepository } from '../../domain/ports/outbound/CardRepository';
import { Card } from '../../domain/entities/Card';

beforeAll(() => {
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  });
});

function ProductServiceMock(productId: number): ProductsService {
  const product = {
    productId,
    productName: 'Chocolate',
  } as Product;

  return {
    validateProductStock: jest.fn().mockReturnValue(true),
    findByIds: jest.fn().mockReturnValue(
      Promise.resolve([
        { ...product, unitsInStock: 10 } as Product,
        {
          ...product,
          productId: 2,
          productName: 'Pantalones',
          unitsInStock: 10,
        } as Product,
      ]),
    ),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    save: jest.fn().mockReturnValue(Promise.resolve(product)),
    updateStock: jest.fn().mockReturnValue(Promise.resolve(product)),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    validateProductPrice: jest.fn().mockReturnValue(true),
  };
}

function TransactionServiceMock(transactionId: number): TransactionService {
  const transaction = {
    transactionId,
    date: new Date(),
    amount: 10,
    status: StatusType.PENDING,
  } as Transaction;
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([transaction])),
    save: jest.fn().mockReturnValue(Promise.resolve(1)),
    updateStatus: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
}

function CustomerServiceMock(customer_id: number): CustomerService {
  const customer = {
    customerId: customer_id,
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    email: 'test@gmail.com',
  } as Customer;
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
  };
}

function CardRepositoryMock(): CardRepository {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new Card())),
  };
}

const card = CardDto.newCardDto({
  number: '4242424242424242',
  exp_month: '08',
  exp_year: '28',
  cvc: '123',
  card_holder: 'José Pérez',
  installments: 1,
} as Card);

describe('TransactionApplicationService', () => {
  let service: TransactionApplication = null;

  it('should call ProductService.save()', async () => {
    const transactionMock = TransactionServiceMock(1);
    const productMock = ProductServiceMock(1);
    const customerMock = CustomerServiceMock(1);
    const cardMock = CardRepositoryMock();
    service = new TransactionApplicationService(
      transactionMock,
      productMock,
      customerMock,
      cardMock,
      new HttpService(),
    );

    const result = await service.createTransaction({
      productId: 1,
      date: new Date(),
      amount: 100000000,
      customerId: 1,
      card: card,
      customer: {
        name: 'John Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'test@gmail.com',
      },
      numberUnits: 1,
    } as CreateTransactionDto);

    expect(transactionMock.save).toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should call ProductService.updateStatus()', async () => {
    const transactionMock = TransactionServiceMock(1);
    const productMock = ProductServiceMock(1);
    const customerMock = CustomerServiceMock(1);
    const cardMock = CardRepositoryMock();
    service = new TransactionApplicationService(
      transactionMock,
      productMock,
      customerMock,
      cardMock,
      new HttpService(),
    );
    await service.updateStatus(1, StatusType.APPROVED);
    expect(transactionMock.updateStatus).toHaveBeenCalled();
  });
});
