import { ProductEntity } from './product.entity';
import { CustomerEntity } from './customer.entity';
import { StatusType } from '../../shared/types/status.type';

export class TransactionEntity {
  transactionId: number;
  transactionNumber: number;
  status: StatusType;
  customer: CustomerEntity;
  products: ProductEntity[];
  date: Date;
  amount: number;
  constructor(
    transactionId: number,
    transactionNumber: number,
    customer: CustomerEntity,
    products: ProductEntity[],
    transactionDate: Date,
    total: number,
    status: StatusType = StatusType.PENDING,
  ) {
    this.transactionId = transactionId;
    this.customer = customer;
    this.products = products;
    this.date = transactionDate;
    this.amount = total;
    this.transactionNumber = transactionNumber;
    this.status = status;
  }
}
