import { TransactionRepository } from '../../../core/domain/ports/outbound/TransactionRepository';
import { Transaction } from '../../../core/domain/entities/Transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { StatusType } from '../../../core/shared/types/status.type';
import { TransactionEntity } from '../../postgress/entities/transaction.entity';
import { TransactionProvider } from '../../postgress/provider/transaction.provider';

export class TransactionRepositoryAdapter implements TransactionRepository {
  constructor(
    private transaction: TransactionProvider,
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.product', 'product')
      .leftJoinAndSelect('transaction.customer', 'customer')
      .leftJoinAndSelect('transaction.card', 'card')
      .getMany();
  }

  findById(id: number): Promise<Transaction> {
    return this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.product', 'product')
      .leftJoinAndSelect('transaction.customer', 'customer')
      .leftJoinAndSelect('transaction.card', 'card')
      .where('transaction.transactionId = :id', { id })
      .getOne();
  }

  async save(transaction: Transaction): Promise<number> {
    const transactionValues = {
      amount: transaction.amount,
      status: transaction.status,
      date: transaction.date,
      numberUnits: transaction.numberUnits,
      transactionNumber: transaction.transactionNumber,
      productId: transaction.product.productId,
      customerId: transaction.customer.customerId,
      cardId: transaction.card.cardId,
    };
    let transactionId = 0;

    await this.transaction.transacction(async (manager: EntityManager) => {
      const m = await manager
        .createQueryBuilder()
        .insert()
        .into(TransactionEntity)
        .values(transactionValues)
        .execute();
      transactionId = m.identifiers[0].transactionId;
    });

    return transactionId;
  }

  async updateStatus(transactionId: number, status: StatusType): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(TransactionEntity)
      .set({
        status: status,
      })
      .where('transactionId = :transactionId', { transactionId })
      .execute();
  }
}
