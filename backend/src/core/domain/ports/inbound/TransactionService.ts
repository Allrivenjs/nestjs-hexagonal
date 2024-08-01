import { TransactionEntity } from '../../entities/transaction.entity';
import { StatusType } from '../../../shared/types/status.type';

export interface TransactionService {
  findById(id: number): Promise<TransactionEntity>;
  findAll(): Promise<TransactionEntity[]>;
  save(transaction: TransactionEntity): Promise<TransactionEntity>;
  updateStatus(
    transactionId: number,
    status: StatusType,
  ): Promise<TransactionEntity>;
}
