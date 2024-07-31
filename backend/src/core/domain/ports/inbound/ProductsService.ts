import { ProductEntity } from '../../entities/product.entity';

export interface ProductsService {
  save(product: ProductEntity): Promise<ProductEntity>;
  validateProductPrice(product: ProductEntity): boolean;
  updateStock(product: ProductEntity, quantity: number): Promise<ProductEntity>;
  findById(id: number): Promise<ProductEntity>;
  validateProductStock(product: ProductEntity, quantity: number): boolean;
}
