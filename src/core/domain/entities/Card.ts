export class Card {
  cardId: number;
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  card_holder: string;
  installments: number;
  type: string;
  static create(
    number: string,
    exp_month: string,
    exp_year: string,
    cvc: string,
    card_holder: string,
    installments: number,
    type: string,
  ): Card {
    const card = new Card();
    card.number = number;
    card.exp_month = exp_month;
    card.exp_year = exp_year;
    card.cvc = cvc;
    card.card_holder = card_holder;
    card.installments = installments;
    card.type = type;
    return card;
  }
}
