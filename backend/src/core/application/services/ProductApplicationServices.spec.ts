import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductApplicationService } from './ProductApplicationServices';
import { ProductApplication } from '../ProductApplication';
import { CreateProductDto } from '../../shared/dto/create-product.dto';

function ProductServiceMock(productId: any): ProductsService {
  const product = {
    productId,
    productName: 'Chocolate',
  } as ProductEntity;
  return {
    validateProductStock: jest.fn().mockReturnValue(true),
    findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    save: jest.fn().mockReturnValue(Promise.resolve(product)),
    updateStock: jest.fn().mockReturnValue(Promise.resolve(product)),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    validateProductPrice: jest.fn().mockReturnValue(true),
  };
}

describe('ProductApplicationService', () => {
  let service: ProductApplication = null;

  it('should call ProductService.save()', async () => {
    const productMock = ProductServiceMock(1);
    service = new ProductApplicationService(productMock);

    const result = await service.createProduct({
      productId: 1,
      productName: 'Chocolate',
      productDescription: 'Chocolate',
      unitsInStock: 10,
      unitPrice: 10,
    } as CreateProductDto);

    expect(productMock.save).toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should call ProductService.findById()', async () => {
    const productMock = ProductServiceMock(1);
    service = new ProductApplicationService(productMock);
    await service.findById(1);
    expect(productMock.findById).toHaveBeenCalled();
  });

  it('should call ProductService.findAll()', async () => {
    const productMock = ProductServiceMock(1);
    service = new ProductApplicationService(productMock);
    await service.findAll();
    expect(productMock.findAll).toHaveBeenCalled();
  });

  it('should call ProductService.updateStock()', async () => {
    const productMock = ProductServiceMock(1);
    service = new ProductApplicationService(productMock);
    await service.updateStockProduct(1, 10);
    expect(productMock.updateStock).toHaveBeenCalled();
  });

  it('should call ProductService.findByIds()', async () => {
    const productMock = ProductServiceMock(1);
    service = new ProductApplicationService(productMock);
    await service.findByIds([1, 2, 3]);
    expect(productMock.findByIds).toHaveBeenCalled();
  });
});
