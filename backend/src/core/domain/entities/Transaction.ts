import { StatusType } from '../../shared/types/status.type';
import { Product } from './Product';
import { Customer } from './Customer';
import { Card } from './Card';

export class Transaction {
  transactionId: number;
  transactionNumber: string;
  status: string;
  amount: number;
  date: Date;
  numberUnits: number;
  product: Product;
  customer: Customer;
  card: Card;

  static create(
    transactionNumber: string,
    date: Date,
    amount: number,
    numberUnits: number,
    product: Product,
    customer: Customer,
    card: Card,
    status?: StatusType,
  ): Transaction {
    const transaction = new Transaction();
    transaction.transactionNumber = transactionNumber;
    transaction.status = status ?? StatusType.PENDING;
    transaction.product = product;
    transaction.date = date;
    transaction.amount = amount;
    transaction.numberUnits = numberUnits;
    transaction.customer = customer;
    transaction.card = card;
    return transaction;
  }
}
