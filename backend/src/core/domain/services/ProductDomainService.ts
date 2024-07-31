import { ProductService } from '../../application/services/product.service';
import { ProductRepository } from '../ports/outbound/ProductRepository';
import { ProductEntity } from '../entities/product.entity';

export class ProductDomainService implements ProductService {
  constructor(private repository: ProductRepository) {}

  findAll(): Promise<ProductEntity[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<ProductEntity> {
    return this.repository.findById(id);
  }
}
