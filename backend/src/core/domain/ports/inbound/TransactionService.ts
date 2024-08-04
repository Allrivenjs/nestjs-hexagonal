import { Transaction } from '../../entities/Transaction';
import { StatusType } from '../../../shared/types/status.type';

export interface TransactionService {
  findById(id: number): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<number>;
  updateStatus(transactionId: number, status: StatusType): Promise<void>;
}
