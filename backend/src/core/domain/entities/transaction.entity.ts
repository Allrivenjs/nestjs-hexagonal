import { ProductEntity } from './product.entity';
import { StatusType } from '../../shared/types/status.type';

export class TransactionEntity {
  transactionId: number;
  transactionNumber: number;
  status: StatusType;
  products: ProductEntity[];
  date: Date;
  amount: number;

  static create(
    date: Date,
    amount: number,
    products: ProductEntity[],
  ): TransactionEntity {
    const transaction = new TransactionEntity();
    transaction.transactionNumber = 0;
    transaction.status = StatusType.PENDING;
    transaction.products = products;
    transaction.date = date;
    transaction.amount = amount;
    return transaction;
  }
}
