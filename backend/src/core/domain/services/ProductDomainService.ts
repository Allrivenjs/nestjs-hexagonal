import { ProductRepository } from '../ports/outbound/ProductRepository';
import { ProductEntity } from '../entities/product.entity';
import { ProductsService } from '../ports/inbound/ProductsService';
import { ProductServiceError } from '../../shared/error/ProductServiceError';

export class ProductDomainService implements ProductsService {
  constructor(private repository: ProductRepository) {}

  async findByIds(ids: number[]): Promise<ProductEntity[]> {
    return this.repository.findByIds(ids);
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    if (this.validateProductPrice(product)) {
      return this.repository.save(product);
    }
    throw new ProductServiceError(
      'Product price cannot be negative or equal to zero',
    );
  }

  async updateStock(id: number, quantity: number): Promise<ProductEntity> {
    return this.repository.updateStock(id, quantity);
  }

  validateProductPrice(product: ProductEntity): boolean {
    return product.unitPrice > 0;
  }

  validateProductStock(product: ProductEntity, quantity: number): boolean {
    return product.unitsInStock >= quantity;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<ProductEntity> {
    return this.repository.findById(id);
  }
}
