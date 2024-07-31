import { CreateProductDto } from '../shared/dto/create-product.dto';
import { ProductEntity } from '../domain/entities/product.entity';

export interface ProductApplication {
  createProduct(newProduct: CreateProductDto): Promise<number>;
  findAll(): Promise<Array<ProductEntity>>;
  findById(id: number): Promise<ProductEntity>;
}
