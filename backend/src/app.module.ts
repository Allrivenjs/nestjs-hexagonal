import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infraestructure/infraestructure.module';
import { ConfigModule } from '@nestjs/config';
import { ProductRepositoryAdapter } from './infraestructure/adapters/product.repository.adapter';
import { TransactionRepositoryAdapter } from './infraestructure/adapters/transaction.repository.adapter';
import { SharedModule } from "./infraestructure/shared/shared.module";

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
      },
    }),
    InfrastructureModule,
    SharedModule,
  ],
})
export class AppModule {}
