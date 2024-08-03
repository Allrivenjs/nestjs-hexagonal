import { TransactionService } from '../ports/inbound/TransactionService';
import { TransactionRepository } from '../ports/outbound/TransactionRepository';
import { Transaction } from '../entities/Transaction';
import { StatusType } from '../../shared/types/status.type';

export class TransactionDomainService implements TransactionService {
  constructor(private repository: TransactionRepository) {}
  findAll(): Promise<Transaction[]> {
    return this.repository.findAll();
  }
  findById(id: number): Promise<Transaction> {
    return this.repository.findById(id);
  }
  updateStatus(transactionId: number, status: StatusType): Promise<void> {
    return this.repository.updateStatus(transactionId, status);
  }

  save(transaction: Transaction): Promise<number> {
    return this.repository.save(transaction);
  }
}
