import { CreateTransactionDto } from '../shared/dto/create-transaction';
import { StatusType } from '../shared/types/status.type';

export interface TransactionApplication {
  createTransaction(transaction: CreateTransactionDto): Promise<number>;
  updateStatus(transactionId: number, status: StatusType): Promise<number>;
}
