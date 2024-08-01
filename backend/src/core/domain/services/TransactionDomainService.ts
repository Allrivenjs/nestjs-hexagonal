import { TransactionService } from '../ports/inbound/TransactionService';
import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { TransactionEntity } from '../entities/transaction.entity';
import { StatusType } from '../../shared/types/status.type';

export class TransactionDomainService implements TransactionService {
  constructor(private repository: TransactionRepository) {}
  findAll(): Promise<TransactionEntity[]> {
    return this.repository.findAll();
  }
  findById(id: number): Promise<TransactionEntity> {
    return this.repository.findById(id);
  }
  updateStatus(
    transactionId: number,
    status: StatusType,
  ): Promise<TransactionEntity> {
    return this.repository.updateStatus(transactionId, status);
  }

  save(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.repository.save(transaction);
  }
}
