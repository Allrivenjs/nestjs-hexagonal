import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusType } from '../../../core/shared/types/status.type';
import { ProductEntity } from './product.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId: number;
  @Column({ name: 'transaction_number' })
  transactionNumber: string;
  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusType,
    default: StatusType.PENDING,
  })
  status: string;
  @Column({ name: 'amount' })
  amount: number;
  @Column({ name: 'date' })
  date: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions)
  customer: CustomerEntity;

  @ManyToMany(() => ProductEntity, (product) => product.transactions)
  @JoinTable({
    name: 'transaction_products',
    joinColumn: {
      name: 'transactionId',
      referencedColumnName: 'transactionId',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'productId',
    },
  })
  products: ProductEntity[];
}
