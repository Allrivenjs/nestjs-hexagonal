import { CreateTransactionDto } from '../shared/dto/create-transaction.dto';
import { StatusType } from '../shared/types/status.type';
import { Transaction } from '../domain/entities/Transaction';

export interface TransactionApplication {
  createTransaction(transaction: CreateTransactionDto): Promise<number>;
  updateStatus(transactionId: number, status: StatusType): Promise<void>;
  getTransaction(transactionId: number): Promise<Transaction>;
}
