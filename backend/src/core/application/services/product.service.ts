// core/application/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../shared/dto/create-product.dto';
import { ProductApplication } from '../ProductApplication';
import { ProductsService } from '../../domain/ports/inbound/ProductsService';

@Injectable()
export class ProductApplicationService implements ProductApplication {
  constructor(private product: ProductsService) {}

  async createProduct(newProduct: CreateProductDto): Promise<number> {
    const entity = ProductEntity.create(
      newProduct.productName,
      newProduct.productDescription,
    );
    const saved = await this.product.save(entity);
    return saved.productId;
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.product.findAll();
  }

  async findByIds(id: number[]): Promise<ProductEntity[]> {
    return await this.product.findByIds(id);
  }

  async updateStockProduct(
    productId: number,
    quantity: number,
  ): Promise<ProductEntity> {
    return await this.product.updateStock(productId, quantity);
  }
}
