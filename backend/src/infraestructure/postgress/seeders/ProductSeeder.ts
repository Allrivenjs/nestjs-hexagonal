import { ProductEntity } from '../entities/product.entity';
import { ProductFactory } from '../factories/productFactory';
import { HttpService } from '@nestjs/axios';

export class ProductSeeder {
  static async run(count: number): Promise<ProductEntity[]> {
    const products: ProductEntity[] = [];

    for (let i = 0; i < count; i++) {
      const product = await new ProductFactory(new HttpService()).definition();
      products.push(product);
    }
    return products;
  }
}
