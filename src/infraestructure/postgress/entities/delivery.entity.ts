import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'delivery' })
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

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.deliveries)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
