import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CardEntity } from './card.entity';
import { ProductEntity } from './product.entity';
import { JoinColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId: number;
  @Column({ name: 'transaction_number' })
  transactionNumber: string;
  @Column({
    name: 'status',
  })
  status: string;
  @Column({ name: 'amount' })
  amount: number;
  @Column({ name: 'date' })
  date: Date;
  @Column({ name: 'number_units' })
  numberUnits: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @JoinColumn({ name: 'customer_id' })
  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions)
  customer: CustomerEntity;

  @Column({ name: 'product_id' })
  productId: number;

  @JoinColumn({ name: 'product_id' })
  @OneToOne(() => ProductEntity, (product) => product.transactions)
  product: ProductEntity;

  @Column({ name: 'card_id' })
  cardId: number;
  @OneToOne(() => CardEntity, (card) => card.transaction)
  @JoinTable()
  card: CardEntity;
}
