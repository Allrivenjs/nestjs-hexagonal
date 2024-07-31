import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { ProductEntity } from './product.entity';

export class TransactionProductEntity {
  @PrimaryGeneratedColumn({ name: 'transaction_product_id' })
  transactionProductId: number;
  @ManyToOne(() => TransactionEntity, (transaction) => transaction.products)
  transaction: TransactionEntity;

  @ManyToOne(() => ProductEntity, (product) => product.transactions)
  product: ProductEntity;

  @Column()
  quantity: number;
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updated_at: Timestamp;
}
