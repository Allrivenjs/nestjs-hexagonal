import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { TransactionRepository } from './domain/ports/outbound/TransactionRepository';
import { ProductsService } from './domain/ports/inbound/ProductsService';
import { ProductApplicationService } from './application/services/product.service';
import { TransactionService } from './domain/ports/inbound/TransactionService';
import { TransactionApplicationService } from './application/services/transaction.service';
import { ProductDomainService } from './domain/services/ProductDomainService';
import { TransactionDomainService } from './domain/services/TransactionDomainService';

/**
 * Options for core module
 */
export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productRepository: Type<ProductRepository>;
    transactionRepository: Type<TransactionRepository>;
  };
};

/**
 * Providers token for netsjs injection
 */
export const PRODUCT_APPLICATION = 'PRODUCT_APPLICATION';
export const TRANSACTION_APPLICATION = 'TRANSACTION_APPLICATION';
export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';
export const TRANSACTION_SERVICE = 'TRANSACTION_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const { productRepository, transactionRepository } = adapters;

    const ProductApplicationProvider = {
      provide: PRODUCT_APPLICATION,
      useFactory(product: ProductsService) {
        return new ProductApplicationService(product);
      },
      inject: [PRODUCT_SERVICE],
    };

    const TransactionApplicationProvider = {
      provide: TRANSACTION_APPLICATION,
      useFactory(transaction: TransactionService, product: ProductsService) {
        return new TransactionApplicationService(transaction, product);
      },
      inject: [TRANSACTION_SERVICE, PRODUCT_SERVICE],
    };

    const ProductServiceProvider = {
      provide: PRODUCT_SERVICE,
      useFactory(repository: ProductRepository) {
        return new ProductDomainService(repository);
      },
      inject: [productRepository],
    };

    const TransactionServiceProvider = {
      provide: TRANSACTION_SERVICE,
      useFactory(repository: TransactionRepository) {
        return new TransactionDomainService(repository);
      },
      inject: [transactionRepository],
    };

    return {
      module: CoreModule,
      global: true,
      imports: [...modules],
      providers: [
        ProductApplicationProvider,
        TransactionApplicationProvider,
        ProductServiceProvider,
        TransactionServiceProvider,
      ],
      exports: [PRODUCT_APPLICATION, TRANSACTION_APPLICATION],
    };
  }
}
