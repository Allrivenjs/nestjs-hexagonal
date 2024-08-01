import { ProductEntity } from '../entities/product.entity';
import { faker } from '@faker-js/faker';
import { Timestamp } from 'typeorm';

export class ProductFactory {
  static definition(): ProductEntity {
    const product = new ProductEntity();
    product.productName = faker.commerce.productName();
    product.productDescription = faker.commerce.productDescription();
    product.imageUrl = faker.image.url();
    product.unitPrice = parseFloat(faker.commerce.price());
    product.unitsInStock = faker.number.int({ min: 0, max: 100 });
    return product;
  }
}
