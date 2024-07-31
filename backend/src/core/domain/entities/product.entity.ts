import { TransactionEntity } from './transaction.entity';

export class ProductEntity {
  productId: number;
  productName: string;
  productDescription: string;
  unitPrice: number;
  unitsInStock: number;
  transactions: TransactionEntity[];
  constructor(
    productId: number,
    productName: string,
    productDescription: string,
    unitPrice: number,
    unitsInStock: number,
    transactions: TransactionEntity[],
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.unitPrice = unitPrice;
    this.unitsInStock = unitsInStock;
    this.transactions = transactions;
  }
}
