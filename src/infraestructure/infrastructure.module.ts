import { Module } from '@nestjs/common';
import { PostgressModule } from './postgress/postgress.module';
import { HttpServerModule } from './http-server/http-server.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './postgress/entities/product.entity';
import { TransactionEntity } from './postgress/entities/transaction.entity';
import { ProductRepositoryAdapter } from './adapters/domain/product.repository.adapter';
import { TransactionRepositoryAdapter } from './adapters/domain/transaction.repository.adapter';
import { CustomerRepositoryAdapter } from './adapters/domain/customer.repository.adapter';
import { CardRepositoryAdapter } from './adapters/domain/card.repository.adapter';
import { CardEntity } from './postgress/entities/card.entity';
import { CustomerEntity } from './postgress/entities/customer.entity';
import { DeliveryRepositoryAdapter } from './adapters/domain/delivery.repository.adapter';
import { DeliveryEntity } from './postgress/entities/delivery.entity';

@Module({
  imports: [
    PostgressModule,
    HttpServerModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      TransactionEntity,
      CardEntity,
      CustomerEntity,
      DeliveryEntity,
    ]),
  ],
  providers: [
    ProductRepositoryAdapter,
    TransactionRepositoryAdapter,
    CustomerRepositoryAdapter,
    CardRepositoryAdapter,
    DeliveryRepositoryAdapter,
  ],
  exports: [
    ProductRepositoryAdapter,
    TransactionRepositoryAdapter,
    CustomerRepositoryAdapter,
    CardRepositoryAdapter,
    DeliveryRepositoryAdapter,
  ],
})
export class InfrastructureModule {}
