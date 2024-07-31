// core/application/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../shared/dto/create-product.dto';
import { ProductRepository } from '../../domain/ports/outbound/ProductRepository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async save(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = new ProductEntity(
      this.productRepository.getNextId(),
      createProductDto.productName,
      createProductDto.productDescription,
      createProductDto.unitPrice,
      createProductDto.unitsInStock,
      [],
    );

    return await this.productRepository.save(newProduct);
  }
}
