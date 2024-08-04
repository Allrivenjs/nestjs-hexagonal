import { CreateProductDto } from '../shared/dto/create-product.dto';
import { Product } from '../domain/entities/Product';

export interface ProductApplication {
  createProduct(newProduct: CreateProductDto): Promise<number>;
  updateStockProduct(productId: number, quantity: number): Promise<Product>;
  findAll(): Promise<Array<Product>>;
  findByIds(productIds: number[]): Promise<Product[]>;
  findById(productId: number): Promise<Product>;
}
