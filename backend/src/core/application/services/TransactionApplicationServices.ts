import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionApplication } from '../TransactionApplication';
import { CreateTransactionDto } from '../../shared/dto/create-transaction';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { StatusType } from '../../shared/types/status.type';
@Injectable()
export class TransactionApplicationService implements TransactionApplication {
  constructor(private transaction: TransactionService) {}

  async createTransaction(transaction: CreateTransactionDto): Promise<number> {
    const entity = TransactionEntity.create(
      transaction.date,
      transaction.amount,
      transaction.productIds,
    );
    const saved = await this.transaction.save(entity);

    return saved.transactionId;
  }

  async updateStatus(
    transactionId: number,
    status: StatusType,
  ): Promise<number> {
    const entity = await this.transaction.findById(transactionId);
    if (!entity) {
      throw new NotFoundException('Transaction not found');
    }
    entity.status = status;
    const update = await this.transaction.save(entity);
    return update.transactionId;
  }
}
