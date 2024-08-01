import { ProductEntity } from '../../entities/product.entity';

export interface ProductRepository {
  findByIds(ids: number[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity>;
  save(product: ProductEntity): Promise<ProductEntity>;
  updateStock(id: number, quantity: number): Promise<ProductEntity>;
}
