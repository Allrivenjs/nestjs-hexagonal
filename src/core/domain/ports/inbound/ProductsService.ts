import { Product } from '../../entities/Product';

export interface ProductsService {
  save(product: Product): Promise<Product>;
  validateProductPrice(product: Product): boolean;
  updateStock(id: number, quantity: number): Promise<Product>;
  findByIds(ids: number[]): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findAll(): Promise<Product[]>;
  validateProductStock(product: Product, quantity: number): boolean;
}
