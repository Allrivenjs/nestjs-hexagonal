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

@Module({
  imports: [
    PostgressModule,
    HttpServerModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      TransactionEntity,
      CardEntity,
      CustomerEntity,
    ]),
  ],
  providers: [
    ProductRepositoryAdapter,
    TransactionRepositoryAdapter,
    CustomerRepositoryAdapter,
    CardRepositoryAdapter,
  ],
  exports: [
    ProductRepositoryAdapter,
    TransactionRepositoryAdapter,
    CustomerRepositoryAdapter,
    CardRepositoryAdapter,
  ],
})
export class InfrastructureModule {}
