import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;
  @Column({ name: 'product_name' })
  productName: string;
  @Column({ name: 'product_description' })
  productDescription: string;
  @Column({ name: 'unit_price' })
  unitPrice: number;
  @Column({ name: 'units_in_stock' })
  unitsInStock: number;
  @ManyToMany(() => TransactionEntity, (transaction) => transaction.products)
  transactions: TransactionEntity[];
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
