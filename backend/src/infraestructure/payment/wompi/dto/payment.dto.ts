import { PaymentEntity } from '../entities/payment.entity';

export class PaymentDto {
  currency: string;
  amount_in_cents: number;
  payment_method: {
    type: string;
    installments: number;
    token: string;
  };
  reference: string;
  acceptance_token: string;
  customer_email: string;
  signature: string;
  redirect_url: string;

  constructor(payment: PaymentEntity) {
    this.currency = payment.currency;
    this.amount_in_cents = payment.amount_in_cents;
    this.payment_method = payment.payment_method;
    this.reference = payment.reference;
    this.acceptance_token = payment.acceptance_token;
    this.customer_email = payment.customer_email;
    this.signature = payment.signature;
    this.redirect_url = payment.redirect_url ?? '';
  }

  static newChargeDto(charge: PaymentEntity): PaymentDto {
    return new PaymentDto(charge);
  }

  toJSON(): PaymentEntity {
    return {
      currency: this.currency,
      amount_in_cents: this.amount_in_cents,
      payment_method: this.payment_method,
      reference: this.reference,
      acceptance_token: this.acceptance_token,
      customer_email: this.customer_email,
      signature: this.signature,
      ...(this.redirect_url && { redirect_url: this.redirect_url }),
    };
  }
}
