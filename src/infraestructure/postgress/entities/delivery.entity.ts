import { Column, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionEntity } from './transaction.entity';
import { CustomerEntity } from "./customer.entity";

export class DeliveryEntity {
  @PrimaryGeneratedColumn({ name: 'delivery_id' })
  deliveryId: number;
  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'transaction_id' })
  transactionId: number;

  @JoinColumn({ name: 'transaction_id' })
  @OneToOne(() => TransactionEntity, (transaction) => transaction.delivery)
  transaction: TransactionEntity;

  @Column({ name: 'customer_id' })
  customerId: number;

  @JoinColumn({ name: 'customer_id' })
  @ManyToOne(() => CustomerEntity, (customer) => customer.deliveries)
  customer: CustomerEntity;
}
