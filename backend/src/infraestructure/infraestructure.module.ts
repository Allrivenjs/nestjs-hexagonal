import { Module } from '@nestjs/common';
import { PostgressModule } from './postgress/postgress.module';
import { HttpServerModule } from './http-server/http-server.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './postgress/entities/product.entity';
import { TransactionEntity } from './postgress/entities/transaction.entity';
import { ProductRepositoryAdapter } from './adapters/product.repository.adapter';
import { TransactionRepositoryAdapter } from './adapters/transaction.repository.adapter';

@Module({
  imports: [
    PostgressModule,
    HttpServerModule,
    TypeOrmModule.forFeature([ProductEntity, TransactionEntity]),
  ],
  providers: [ProductRepositoryAdapter, TransactionRepositoryAdapter],
  exports: [ProductRepositoryAdapter, TransactionRepositoryAdapter],
})
export class InfrastructureModule {}
