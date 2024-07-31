import { TransactionEntity } from '../../entities/transaction.entity';
import { StatusType } from '../../../shared/types/status.type';

export interface TransactionService {
  findById(id: number): Promise<TransactionEntity>;
  findAll(): Promise<TransactionEntity[]>;
  save(transaction: TransactionEntity): Promise<TransactionEntity>;
  updateStatus(
    transaction: TransactionEntity,
    status: StatusType,
  ): Promise<TransactionEntity>;
}
