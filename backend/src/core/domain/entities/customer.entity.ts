import { TransactionEntity } from './transaction.entity';

export class CustomerEntity {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  transactions: TransactionEntity[];
  constructor(
    customerId: number,
    firstName: string,
    lastName: string,
    email: string,
    transactions: TransactionEntity[],
  ) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.transactions = transactions;
  }
}
