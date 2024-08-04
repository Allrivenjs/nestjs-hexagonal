import { ChargeEntity } from '../entities/charge.entity';

export class ChargeDto {
  currency: string;
  amount_in_cents: number;
  payment_method: {
    type: string;
    installments: number;
    token: string;
  };
  reference: string;

  constructor(charge: ChargeEntity) {
    this.currency = charge.currency;
    this.amount_in_cents = charge.amount_in_cents;
    this.payment_method = charge.payment_method;
    this.reference = charge.reference;
  }

  static newChargeDto(charge: ChargeEntity): ChargeDto {
    return new ChargeDto(charge);
  }
}
