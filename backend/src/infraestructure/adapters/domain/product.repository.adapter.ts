import { ProductRepository } from '../../../core/domain/ports/outbound/ProductRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../core/domain/entities/Product';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../../postgress/entities/product.entity';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  findByIds(ids: number[]): Promise<Product[]> {
    return this.repository.findBy({ productId: In(ids) });
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    await this.repository.update(id, { unitsInStock: quantity });
    return await this.repository.findOneBy({ productId: id });
  }

  findById(id: number): Promise<Product> {
    return this.repository.findOneBy({ productId: id });
  }

  saveAll(products: Product[]): Promise<Product[]> {
    return this.repository.save(products);
  }
}
