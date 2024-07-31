import { CreateTransactionDto } from '../shared/dto/create-transaction';

export interface TransactionApplication {
  createTransaction(transaction: CreateTransactionDto): Promise<number>;
  updateStatus(transactionId: number, status: string): Promise<number>;
}
