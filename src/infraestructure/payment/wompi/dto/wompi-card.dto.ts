export class WompiCardDto {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  card_holder: string;
  installments: number;

  static create(
    number: string,
    exp_month: string,
    exp_year: string,
    cvc: string,
    card_holder: string,
    installments: number,
  ): WompiCardDto {
    const card = new WompiCardDto();
    card.number = number;
    card.exp_month = exp_month;
    card.exp_year = exp_year;
    card.cvc = cvc;
    card.card_holder = card_holder;
    card.installments = installments;
    return card;
  }

  toObject(): object {
    return {
      number: this.number,
      exp_month: this.exp_month,
      exp_year: this.exp_year,
      cvc: this.cvc,
      card_holder: this.card_holder,
      installments: this.installments,
    };
  }
}
