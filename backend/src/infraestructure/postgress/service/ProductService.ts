import { Injectable } from '@nestjs/common';

import { ProductSeeder } from '../seeders/ProductSeeder';
import { ProductApplication } from '../../../core/application/ProductApplication';

@Injectable()
export class ProductService {
  constructor(private application: ProductApplication) {}
  // Genera y guarda varios productos falsos
  async generateAndSaveFakeProducts(count: number): Promise<number[]> {
    const products = await ProductSeeder.run(count);
    return await Promise.all(
      products.map((product) => this.application.createProduct(product)),
    );
  }
}
