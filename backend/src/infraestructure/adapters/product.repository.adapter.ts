import { ProductRepository } from '../../core/domain/ports/outbound/ProductRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../core/domain/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.repository.find();
  }

  findByIds(ids: number[]): Promise<ProductEntity[]> {
    return this.repository.findBy({ productId: In(ids) });
  }

  save(product: ProductEntity): Promise<ProductEntity> {
    return this.repository.save(product);
  }

  async updateStock(id: number, quantity: number): Promise<ProductEntity> {
    await this.repository.update(id, { unitsInStock: quantity });
    return await this.repository.findOneBy({ productId: id });
  }

  findById(id: number): Promise<ProductEntity> {
    return this.repository.findOneBy({ productId: id });
  }

  saveAll(products: ProductEntity[]): Promise<ProductEntity[]> {
    return this.repository.save(products);
  }
}
