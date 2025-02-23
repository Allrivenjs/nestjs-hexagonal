import { ProductRepository } from '../ports/outbound/ProductRepository';
import { Product } from '../entities/Product';
import { ProductDomainService } from './ProductDomainService';
import { ProductServiceError } from '../../shared/error/ProductServiceError';

function ProductRepositoryMock(): ProductRepository {
  return {
    findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    save: jest.fn().mockReturnValue(Promise.resolve(new Product())),
    updateStock: jest.fn().mockReturnValue(Promise.resolve(new Product())),
    findById: jest.fn().mockReturnValue(Promise.resolve(new Product())),
  };
}

describe('ProductDomainService', () => {
  let services: ProductRepository = null;

  it('should call ProductRepository.findByIds()', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await services.findByIds([1, 2, 3]);
    expect(repositoryMock.findByIds).toHaveBeenCalled();
  });

  it('should call ProductRepository.findAll()', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await services.findAll();
    expect(repositoryMock.findAll).toHaveBeenCalled();
  });

  it('should call ProductRepository.save()', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await services.save({
      productId: 1,
      unitPrice: 100,
    } as Product);
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should call ProductRepository.updateStock()', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await services.updateStock(1, 10);
    expect(repositoryMock.updateStock).toHaveBeenCalled();
  });

  it('should throw ProductServiceError when unitPrice is negative or zero"', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await expect(
      services.save({ productId: 1, unitPrice: 0 } as Product),
    ).rejects.toThrow(ProductServiceError);
    await expect(
      services.save({ productId: 1, unitPrice: -10 } as Product),
    ).rejects.toThrow(ProductServiceError);
  });

  it('should call ProductRepository.findById()', async () => {
    const repositoryMock = ProductRepositoryMock();
    services = new ProductDomainService(repositoryMock);
    await services.findById(1);
    expect(repositoryMock.findById).toHaveBeenCalled();
  });
});
