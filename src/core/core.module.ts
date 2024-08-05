import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { TransactionRepository } from './domain/ports/outbound/TransactionRepository';
import { ProductsService } from './domain/ports/inbound/ProductsService';
import { ProductApplicationService } from './application/services/ProductApplicationServices';
import { TransactionService } from './domain/ports/inbound/TransactionService';
import { TransactionApplicationService } from './application/services/TransactionApplicationServices';
import { ProductDomainService } from './domain/services/ProductDomainService';
import { TransactionDomainService } from './domain/services/TransactionDomainService';
import { CustomerRepository } from './domain/ports/outbound/CustomerRepository';
import { CardRepository } from './domain/ports/outbound/CardRepository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CustomerDomainService } from './domain/services/CustomerDomainService';
import { CardDomainServices } from './domain/services/CardDomainServices';
import { CustomerApplicationServices } from './application/services/CustomerApplicationServices';
import { CardApplicationServices } from './application/services/CardApplicationServices';
import { DeliveryRepository } from './domain/ports/outbound/DeliveryRepository';
import { DeliveryDomainService } from './domain/services/DeliveryDomainService';
import { DeliveryApplicationServices } from './application/services/DeliveryApplicationServices';

/**
 * Options for core module
 */
export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productRepository: Type<ProductRepository>;
    transactionRepository: Type<TransactionRepository>;
    customerRepository: Type<CustomerRepository>;
    cardRepository: Type<CardRepository>;
    deliveryRepository: Type<DeliveryRepository>;
  };
};

/**
 * Providers token for netsjs injection
 */
export const PRODUCT_APPLICATION = 'PRODUCT_APPLICATION';
export const TRANSACTION_APPLICATION = 'TRANSACTION_APPLICATION';
export const CUSTOMER_APPLICATION = 'CUSTOMER_APPLICATION';
export const CARD_APPLICATION = 'CARD_APPLICATION';
export const DELIVERY_APPLICATION = 'DELIVERY_APPLICATION';

export const CUSTOMER_SERVICE = 'CUSTOMER_SERVICE';
export const CARD_SERVICE = 'CARD_SERVICE';
export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';
export const TRANSACTION_SERVICE = 'TRANSACTION_SERVICE';
export const DELIVERY_SERVICE = 'DELIVERY_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const {
      productRepository,
      transactionRepository,
      customerRepository,
      cardRepository,
      deliveryRepository,
    } = adapters;

    const DeliveryApplicationProvider = {
      provide: DELIVERY_APPLICATION,
      useFactory(repository: DeliveryRepository) {
        return new DeliveryApplicationServices(repository);
      },
      inject: [DELIVERY_SERVICE],
    };

    const CardApplicationProvider = {
      provide: CARD_APPLICATION,
      useFactory(repository: CardRepository) {
        return new CardApplicationServices(repository);
      },
      inject: [CARD_SERVICE],
    };

    const DeliveryServiceProvider = {
      provide: DELIVERY_SERVICE,
      useFactory(repository: DeliveryRepository) {
        return new DeliveryDomainService(repository);
      },
      inject: [deliveryRepository],
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

    const CustomerServiceProvider = {
      provide: CUSTOMER_SERVICE,
      useFactory(repository: CustomerRepository) {
        return new CustomerDomainService(repository);
      },
      inject: [customerRepository],
    };

    const CardServiceProvider = {
      provide: CARD_SERVICE,
      useFactory(repository: CardRepository) {
        return new CardDomainServices(repository);
      },
      inject: [cardRepository],
    };

    const ProductApplicationProvider = {
      provide: PRODUCT_APPLICATION,
      useFactory(product: ProductsService) {
        return new ProductApplicationService(product);
      },
      inject: [PRODUCT_SERVICE],
    };

    const TransactionApplicationProvider = {
      provide: TRANSACTION_APPLICATION,
      useFactory(
        transaction: TransactionService,
        product: ProductsService,
        customer: CustomerRepository,
        card: CardRepository,
        delivery: DeliveryRepository,
      ) {
        return new TransactionApplicationService(
          transaction,
          product,
          customer,
          card,
          delivery,
          new HttpService(),
        );
      },
      inject: [
        TRANSACTION_SERVICE,
        PRODUCT_SERVICE,
        CUSTOMER_SERVICE,
        CARD_SERVICE,
        DELIVERY_SERVICE,
      ],
    };

    const CustomerApplicationProvider = {
      provide: CUSTOMER_APPLICATION,
      useFactory(customer: CustomerRepository) {
        return new CustomerApplicationServices(customer);
      },
      inject: [CUSTOMER_SERVICE],
    };

    return {
      module: CoreModule,
      global: true,
      imports: [...modules],
      providers: [
        CustomerApplicationProvider,
        ProductApplicationProvider,
        TransactionApplicationProvider,
        DeliveryApplicationProvider,
        CardApplicationProvider,
        ProductServiceProvider,
        TransactionServiceProvider,
        CustomerServiceProvider,
        CardServiceProvider,
        DeliveryServiceProvider,
      ],
      exports: [
        PRODUCT_APPLICATION,
        TRANSACTION_APPLICATION,
        CUSTOMER_APPLICATION,
        CARD_APPLICATION,
        DELIVERY_APPLICATION,
      ],
    };
  }
}
