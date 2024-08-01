import { StatusType } from '../../shared/types/status.type';
import { ProductEntity } from './product.entity';

export class TransactionEntity {
  transactionId: number;
  transactionNumber: number;
  status: StatusType;
  products: ProductEntity[];
  date: Date;
  amount: number;

  static create(
    transactionNumber: number,
    date: Date,
    amount: number,
    products: ProductEntity[],
  ): TransactionEntity {
    const transaction = new TransactionEntity();
    transaction.transactionNumber = transactionNumber;
    transaction.status = StatusType.PENDING;
    transaction.products = products;
    transaction.date = date;
    transaction.amount = amount;
    return transaction;
  }
}
