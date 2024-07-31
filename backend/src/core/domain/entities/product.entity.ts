import { TransactionEntity } from './transaction.entity';

export class ProductEntity {
  productId: number;
  productName: string;
  productDescription: string;
  unitPrice: number;
  unitsInStock: number;
  transactions?: TransactionEntity[];

  static create(name: string, description: string): ProductEntity {
    const product = new ProductEntity();
    product.productName = name;
    product.productDescription = description;
    product.unitPrice = 0;
    product.unitsInStock = 0;
    product.transactions = [];
    return product;
  }
}
