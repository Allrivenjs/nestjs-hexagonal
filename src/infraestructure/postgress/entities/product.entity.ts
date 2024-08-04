import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;
  @Column({ name: 'product_name' })
  productName: string;
  @Column({ name: 'product_description' })
  productDescription: string;
  @Column({ name: 'image_url' })
  imageUrl: string;
  @Column({ name: 'unit_price' })
  unitPrice: number;
  @Column({ name: 'units_in_stock' })
  unitsInStock: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.product)
  transactions: TransactionEntity[];
}
