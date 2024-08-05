import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../shared/config/database.config';
import { ProductEntity } from './entities/product.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { CustomerEntity } from './entities/customer.entity';
import { CardEntity } from './entities/card.entity';
import { TransactionProvider } from './provider/transaction.provider';
import { DeliveryEntity } from './entities/delivery.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [
            TransactionEntity,
            ProductEntity,
            CustomerEntity,
            CardEntity,
            DeliveryEntity,
          ],
          logging: ['query'],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TransactionProvider],
  exports: [TransactionProvider],
})
export class PostgressModule {}
