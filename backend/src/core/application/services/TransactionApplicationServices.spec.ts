import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { ProductEntity } from '../../domain/entities/product.entity';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { TransactionApplication } from '../TransactionApplication';
import { TransactionApplicationService } from './TransactionApplicationServices';
import { CreateTransactionDto } from '../../shared/dto/create-transaction';
import { StatusType } from '../../shared/types/status.type';
import { TransactionEntity } from '../../domain/entities/transaction.entity';

function ProductServiceMock(productId: number): ProductsService {
  const product = {
    productId,
    productName: 'Chocolate',
  } as ProductEntity;

  return {
    validateProductStock: jest.fn().mockReturnValue(true),
    findByIds: jest.fn().mockReturnValue(
      Promise.resolve([
        { ...product, unitsInStock: 10 } as ProductEntity,
        {
          ...product,
          productId: 2,
          productName: 'Pantalones',
          unitsInStock: 10,
        } as ProductEntity,
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
  } as TransactionEntity;
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([transaction])),
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    updateStatus: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
}

describe('TransactionApplicationService', () => {
  let service: TransactionApplication = null;

  it('should call ProductService.save()', async () => {
    const transactionMock = TransactionServiceMock(1);
    const productMock = ProductServiceMock(1);
    service = new TransactionApplicationService(transactionMock, productMock);

    const result = await service.createTransaction({
      productIds: [1],
      date: new Date(),
      amount: 10,
    } as CreateTransactionDto);

    expect(transactionMock.save).toHaveBeenCalled();
    console.log(result);
    expect(result).toBe(1);
  });

  it('should call ProductService.updateStatus()', async () => {
    const transactionMock = TransactionServiceMock(1);
    const productMock = ProductServiceMock(1);
    service = new TransactionApplicationService(transactionMock, productMock);
    await service.updateStatus(1, StatusType.APPROVED);
    expect(transactionMock.updateStatus).toHaveBeenCalled();
  });
});
