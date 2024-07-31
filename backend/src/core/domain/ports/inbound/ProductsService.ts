import { ProductEntity } from '../../entities/product.entity';

export interface ProductsService {
  save(product: ProductEntity): Promise<ProductEntity>;
  validateProductPrice(product: ProductEntity): boolean;
  updateStock(id: number, quantity: number): Promise<ProductEntity>;
  findByIds(ids: number[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  validateProductStock(product: ProductEntity, quantity: number): boolean;
}
