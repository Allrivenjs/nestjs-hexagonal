import { ProductEntity } from '../../entities/product.entity';

export interface ProductRepository {
  findById(id: number): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  save(product: ProductEntity): Promise<ProductEntity>;
  getNextId(): number;
}
