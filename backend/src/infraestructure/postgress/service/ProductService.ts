import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSeeder } from '../seeders/ProductSeeder';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  // Genera y guarda varios productos falsos
  async generateAndSaveFakeProducts(count: number): Promise<ProductEntity[]> {
    const products = await ProductSeeder.run(count);
    return await this.productRepository.save(products);
  }
}
