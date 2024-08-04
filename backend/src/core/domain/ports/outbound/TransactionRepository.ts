import { Transaction } from '../../entities/Transaction';
import { StatusType } from '../../../shared/types/status.type';

export interface TransactionRepository {
  findById(id: number): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<number>;
  updateStatus(transactionID: number, status: StatusType): Promise<void>;
}
