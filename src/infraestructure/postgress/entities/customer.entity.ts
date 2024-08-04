import { TransactionEntity } from './transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  customerId: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'email', unique: true })
  email: string;
  @Column({ name: 'phone' })
  phone: string;
  @Column({ name: 'address' })
  address: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  transactions: TransactionEntity[];
}
