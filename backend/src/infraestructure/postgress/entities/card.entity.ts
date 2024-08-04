import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn({ name: 'card_id' })
  cardId: number;
  @Column({ name: 'number' })
  number: string;

  @Column({ name: 'exp_month' })
  exp_month: string;
  @Column({ name: 'exp_year' })
  exp_year: string;

  @Column({ name: 'cvc' })
  cvc: string;
  @Column({ name: 'card_holder' })
  card_holder: string;
  @Column({ name: 'installments' })
  installments: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.card)
  @JoinTable()
  transactions: TransactionEntity[];
}
