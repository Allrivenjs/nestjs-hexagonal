export interface ChargeEntity {
  currency: string;
  amount_in_cents: number;
  payment_method: {
    type: string;
    installments: number;
    token: string;
  };
  reference: string;
}
