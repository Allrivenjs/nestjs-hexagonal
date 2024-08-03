export class Card {
  cardId: number;
  number: string;
  exp_month: string;
  exp_year: string;
  cvv: string;
  card_holder: string;
  installments: number;
  static create(
    number: string,
    exp_month: string,
    exp_year: string,
    cvv: string,
    card_holder: string,
    installments: number,
  ): Card {
    const card = new Card();
    card.number = number;
    card.exp_month = exp_month;
    card.exp_year = exp_year;
    card.cvv = cvv;
    card.card_holder = card_holder;
    card.installments = installments;
    return card;
  }
}
