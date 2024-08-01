import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionDomainService } from './TransactionDomainService';
import { StatusType } from '../../shared/types/status.type';

function TransactionRepositoryMock(): TransactionRepository {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new TransactionEntity())),
    findById: jest
      .fn()
      .mockReturnValue(Promise.resolve(new TransactionEntity())),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    updateStatus: jest
      .fn()
      .mockReturnValue(Promise.resolve(new TransactionEntity())),
  };
}

describe('TransactionDomainService', () => {
  let service: TransactionRepository = null;

  it('should call TransactionRepository.save()', async () => {
    const repositoryMock = TransactionRepositoryMock();
    service = new TransactionDomainService(repositoryMock);
    await service.save({
      transactionId: 1,
      amount: 100,
    } as TransactionEntity);
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should call TransactionRepository.findById()', async () => {
    const repositoryMock = TransactionRepositoryMock();
    service = new TransactionDomainService(repositoryMock);
    await service.findById(1);
    expect(repositoryMock.findById).toHaveBeenCalled();
  });

  it('should call TransactionRepository.findAll()', async () => {
    const repositoryMock = TransactionRepositoryMock();
    service = new TransactionDomainService(repositoryMock);
    await service.findAll();
    expect(repositoryMock.findAll).toHaveBeenCalled();
  });

  it('should call TransactionRepository.updateStatus()', async () => {
    const repositoryMock = TransactionRepositoryMock();
    service = new TransactionDomainService(repositoryMock);
    await service.updateStatus(1, StatusType.PENDING);
    expect(repositoryMock.updateStatus).toHaveBeenCalled();
  });
});
