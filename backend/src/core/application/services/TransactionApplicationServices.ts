import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionApplication } from '../TransactionApplication';
import { CreateTransactionDto } from '../../shared/dto/create-transaction';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { StatusType } from '../../shared/types/status.type';
import { ProductsService } from '../../domain/ports/inbound/ProductsService';
@Injectable()
export class TransactionApplicationService implements TransactionApplication {
  constructor(
    private transaction: TransactionService,
    private product: ProductsService,
  ) {}

  async createTransaction(transaction: CreateTransactionDto): Promise<number> {
    const products = await this.product.findByIds(transaction.productIds);
    if (
      products.length <= 0 &&
      !products.every((product) => product.unitsInStock > 0)
    ) {
      throw new NotFoundException('Product not found');
    }
    const transactionNumber = Math.floor(Math.random() * 1000000);
    const entity = TransactionEntity.create(
      transactionNumber,
      transaction.date,
      transaction.amount,
      products,
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
    const update = await this.transaction.updateStatus(
      entity.transactionId,
      status,
    );
    return update.transactionId;
  }
}
