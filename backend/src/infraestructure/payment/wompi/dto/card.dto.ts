import { Card } from '../../../../core/domain/entities/Card';

export class CardDto {
  number: string;
  exp_month: string;
  exp_year: string;
  cvv: string;
  card_holder: string;
  installments: number;

  constructor(card: Card) {
    this.number = card.number;
    this.exp_month = card.exp_month;
    this.exp_year = card.exp_year;
    this.cvv = card.cvv;
    this.card_holder = card.card_holder;
    this.installments = card.installments;
  }

  static newCardDto(card: Card): CardDto {
    return new CardDto(card);
  }
}
