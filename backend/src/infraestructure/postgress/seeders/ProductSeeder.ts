import { ProductEntity } from '../entities/product.entity';
import { ProductFactory } from '../factories/productFactory';

export class ProductSeeder {
  static run(count: number): ProductEntity[] {
    const products: ProductEntity[] = [];

    for (let i = 0; i < count; i++) {
      const product = ProductFactory.definition();
      products.push(product);
    }
    return products;
  }
}
