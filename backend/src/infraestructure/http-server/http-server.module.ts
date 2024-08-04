import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { RootController } from './controllers/root.controller';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  controllers: [RootController, ProductController, TransactionController],
})
export class HttpServerModule {}
