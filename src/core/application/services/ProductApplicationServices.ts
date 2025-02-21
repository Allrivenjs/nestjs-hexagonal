// core/application/services/ProductApplicationServices.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/Product';
import { CreateProductDto } from '../../shared/dto/create-product.dto';
import { ProductApplication } from '../ProductApplication';
import { ProductsService } from '../../domain/ports/inbound/ProductsService';

@Injectable()
export class ProductApplicationService implements ProductApplication {
  constructor(private product: ProductsService) {}

  async createProduct(newProduct: CreateProductDto): Promise<number> {
    const entity = Product.create(
      newProduct.productName,
      newProduct.productDescription,
      newProduct.imageUrl,
      newProduct.unitsInStock,
      newProduct.unitPrice,
    );
    const saved = await this.product.save(entity);
    return saved.productId;
  }

  async findAll(): Promise<Product[]> {
    return await this.product.findAll();
  }

  async findByIds(id: number[]): Promise<Product[]> {
    return await this.product.findByIds(id);
  }

  async updateStockProduct(
    productId: number,
    quantity: number,
  ): Promise<Product> {
    return await this.product.updateStock(productId, quantity);
  }

  async findById(productId: number): Promise<Product> {
    return await this.product.findById(productId);
  }
}
