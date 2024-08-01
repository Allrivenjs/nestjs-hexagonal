import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { ProductEntity } from '../../domain/entities/product.entity';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { TransactionApplication } from '../TransactionApplication';
import { CreateProductDto } from '../../shared/dto/create-product.dto';
import { TransactionApplicationService } from './TransactionApplicationServices';
import { CreateTransactionDto } from '../../shared/dto/create-transaction';
import { StatusType } from '../../shared/types/status.type';

function ProductServiceMock(productId: number): ProductsService {
  const product = {
    productId,
    productName: 'Chocolate',
  } as ProductEntity;
  return {
    validateProductStock: jest.fn().mockReturnValue(true),
    findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    save: jest.fn().mockReturnValue(Promise.resolve(product)),
    updateStock: jest.fn().mockReturnValue(Promise.resolve(product)),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    validateProductPrice: jest.fn().mockReturnValue(true),
  };
}

function TransactionServiceMock(transactionId: number): TransactionService {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve({ transactionId })),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    save: jest.fn().mockReturnValue(Promise.resolve({ transactionId })),
    updateStatus: jest.fn().mockReturnValue(Promise.resolve({ transactionId })),
  };
}

describe('TransactionApplicationService', () => {
  let service: TransactionApplication = null;

  it('should call ProductService.save()', async () => {
    const transactionMock = TransactionServiceMock(1);
    service = new TransactionApplicationService(transactionMock);

    const result = await service.createTransaction({
      productIds: [{ productId: 1, unitPrice: 0 } as ProductEntity],
      date: new Date(),
      amount: 10,
    } as CreateTransactionDto);

    expect(transactionMock.save).toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should call ProductService.updateStatus()', async () => {
    const transactionMock = TransactionServiceMock(1);
    service = new TransactionApplicationService(transactionMock);
    await service.updateStatus(1, StatusType.APPROVED);
    expect(transactionMock.updateStatus).toHaveBeenCalled();
  });
});
