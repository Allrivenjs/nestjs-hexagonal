import { Transaction } from './Transaction';
import { Customer } from './Customer';

export class Delivery {
  deliveryId: number;
  status: string;
  city: string;
  address: string;
  zipCode: string;
  state: string;
  transactionId: number;
  transaction: Transaction;
  customerId: number;
  customer: Customer;
}
