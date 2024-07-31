import { TransactionService } from '../ports/inbound/TransactionService';
import { TransctionRepository } from '../ports/outbound/TransctionRepository';
import { TransactionEntity } from '../entities/transaction.entity';
import { StatusType } from '../../shared/types/status.type';

export class TransactionDomainService implements TransactionService {
  constructor(private repository: TransctionRepository) {}
  findAll(): Promise<TransactionEntity[]> {
    return this.repository.findAll();
  }
  findById(id: number): Promise<TransactionEntity> {
    return this.repository.findById(id);
  }
  updateStatus(
    transaction: TransactionEntity,
    status: StatusType,
  ): Promise<TransactionEntity> {
    return this.repository.updateStatus(transaction, status);
  }

  save(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.repository.save(transaction);
  }
}
