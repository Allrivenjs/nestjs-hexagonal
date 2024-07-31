import { TransactionEntity } from './transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  customerId: number;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ name: 'email' })
  email: string;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  transactions: TransactionEntity[];
}
