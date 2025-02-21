import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CardEntity } from './card.entity';
import { ProductEntity } from './product.entity';
import { JoinColumn } from 'typeorm';
import { DeliveryEntity } from './delivery.entity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId: number;
  @Column({ name: 'transaction_number', primary: true })
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
  @ManyToOne(() => ProductEntity, (product) => product.transactions)
  product: ProductEntity;

  @Column({ name: 'card_id' })
  cardId: number;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne(() => CardEntity, (card) => card.transactions)
  card: CardEntity;

  @Column({ name: 'delivery_id' })
  deliveryId: number;

  @JoinColumn({ name: 'delivery_id' })
  @OneToOne(() => DeliveryEntity)
  delivery: DeliveryEntity;
}
