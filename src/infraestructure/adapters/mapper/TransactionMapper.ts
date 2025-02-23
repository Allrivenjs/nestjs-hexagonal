import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../core/shared/Mapper';
import { TransactionEntity } from '../../postgress/entities/transaction.entity';
import { Transaction } from '../../../core/domain/entities/Transaction';
import { Card } from "../../../core/domain/entities/Card";

@Injectable()
export class TransactionMapper
  implements Mapper<TransactionEntity, Transaction>
{
  constructor() {}

  map(entity: TransactionEntity): Transaction {
    const transaction = new Transaction();
    transaction.transactionId = entity.transactionId;
    transaction.product = entity.product;
    transaction.customer = entity.customer;
    transaction.card = {
      cardId: entity.card.cardId,
      number: entity.card.number,
      exp_month: entity.card.exp_month,
      exp_year: entity.card.exp_year,
      cvc: entity.card.cvc,
      installments: entity.card.installments,
      card_holder: entity.card.card_holder,
      type: entity.card.type,
    } as Card;
    transaction.status = entity.status;
    transaction.amount = entity.amount;
    transaction.transactionNumber = entity.transactionNumber;
    transaction.date = entity.date;
    transaction.numberUnits = entity.numberUnits;
    return transaction;
  }
}
