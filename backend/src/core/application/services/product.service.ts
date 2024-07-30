// core/application/services/product.service.ts
import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from '../../shared/dto/create-product.dto';
// import { Product } from '../../domain/entities/product.entity';
// import { ProductRepository } from '../../domain/ports/outbound/product.repository';

@Injectable()
export class ProductService {
  // constructor(private readonly productRepository: ProductRepository) {}
  //
  // async save(createProductDto: CreateProductDto): Promise<Product> {
  //   const newProduct = new Product(
  //     this.productRepository.getNextId(),
  //     createProductDto.name,
  //     createProductDto.description,
  //     createProductDto.price,
  //     createProductDto.stock,
  //   );
  //
  //   return await this.productRepository.save(newProduct);
  // }
}
