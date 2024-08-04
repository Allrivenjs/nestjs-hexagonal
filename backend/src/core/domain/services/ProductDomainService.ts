import { ProductRepository } from '../ports/outbound/ProductRepository';
import { Product } from '../entities/Product';
import { ProductsService } from '../ports/inbound/ProductsService';
import { ProductServiceError } from '../../shared/error/ProductServiceError';

export class ProductDomainService implements ProductsService {
  constructor(private repository: ProductRepository) {}

  async findByIds(ids: number[]): Promise<Product[]> {
    return this.repository.findByIds(ids);
  }

  async save(product: Product): Promise<Product> {
    if (this.validateProductPrice(product)) {
      return this.repository.save(product);
    }
    throw new ProductServiceError(
      'Product price cannot be negative or equal to zero',
    );
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    return this.repository.updateStock(id, quantity);
  }

  validateProductPrice(product: Product): boolean {
    return product.unitPrice > 0;
  }

  validateProductStock(product: Product, quantity: number): boolean {
    return product.unitsInStock >= quantity;
  }

  async findAll(): Promise<Product[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<Product> {
    return this.repository.findById(id);
  }
}
