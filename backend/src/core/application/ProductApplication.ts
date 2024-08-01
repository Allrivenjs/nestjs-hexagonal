import { CreateProductDto } from '../shared/dto/create-product.dto';
import { ProductEntity } from '../domain/entities/product.entity';

export interface ProductApplication {
  createProduct(newProduct: CreateProductDto): Promise<number>;
  updateStockProduct(
    productId: number,
    quantity: number,
  ): Promise<ProductEntity>;
  findAll(): Promise<Array<ProductEntity>>;
  findByIds(productIds: number[]): Promise<ProductEntity[]>;
  findById(productId: number): Promise<ProductEntity>;
}
