import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infraestructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { ProductRepositoryAdapter } from './infraestructure/adapters/domain/product.repository.adapter';
import { TransactionRepositoryAdapter } from './infraestructure/adapters/domain/transaction.repository.adapter';
import { SharedModule } from './infraestructure/shared/shared.module';
import { CardRepositoryAdapter } from './infraestructure/adapters/domain/card.repository.adapter';
import { CustomerRepositoryAdapter } from './infraestructure/adapters/domain/customer.repository.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CoreModule.register({
      modules: [InfrastructureModule],
      adapters: {
        productRepository: ProductRepositoryAdapter,
        transactionRepository: TransactionRepositoryAdapter,
        cardRepository: CardRepositoryAdapter,
        customerRepository: CustomerRepositoryAdapter,
      },
    }),
    InfrastructureModule,
    SharedModule,
  ],
})
export class AppModule {}
