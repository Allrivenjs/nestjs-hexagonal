import { CardEntity } from '../entities/card.entity';

export class CardDto {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  card_holder: string;

  constructor(card: CardEntity) {
    this.number = card.number;
    this.exp_month = card.exp_month;
    this.exp_year = card.exp_year;
    this.cvc = card.cvc;
    this.card_holder = card.card_holder;
  }

  static newCardDto(card: CardEntity): CardDto {
    return new CardDto(card);
  }
}
