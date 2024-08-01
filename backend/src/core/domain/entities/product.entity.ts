import { TransactionEntity } from './transaction.entity';

export class ProductEntity {
  productId: number;
  productName: string;
  productDescription: string;
  imageUrl: string;
  unitPrice: number;
  unitsInStock: number;
  transactions?: TransactionEntity[];

  static create(
    name: string,
    description: string,
    imageUrl: string,
    stock: number,
    price: number,
  ): ProductEntity {
    const product = new ProductEntity();
    product.productName = name;
    product.productDescription = description;
    product.unitPrice = price;
    product.unitsInStock = stock;
    product.transactions = [];
    product.imageUrl = imageUrl;

    return product;
  }
}
