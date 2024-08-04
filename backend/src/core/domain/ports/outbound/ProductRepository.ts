import { Product } from '../../entities/Product';

export interface ProductRepository {
  findByIds(ids: number[]): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  save(product: Product): Promise<Product>;
  updateStock(id: number, quantity: number): Promise<Product>;
}
